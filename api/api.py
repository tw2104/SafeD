from flask import Flask, request
from db import db, app, client, tunnel, Record
from sqlalchemy import desc
from datetime import date, datetime, timedelta
import time
import json



# route configuration
	# running before first request
@app.before_first_request
def before_first_request_func():
		# start ssh tunnel
	tunnel.start()
		# create table
	db.create_all()

	# running for debugging to avoid open tunnel exception
@app.route('/close')
def close_db_tunnel():
	tunnel.close()
	return 'Tunnel closed.'

	# running for debugging to drop all tables
@app.route('/drop')
def drop_tables():
		# drop table
	db.drop_all()
	return 'All tables dropped.'

	# running for sending sms message
@app.route('/api/send_txt/<location>/<int:phone>/<result>', methods = ['GET'])
def send_txt(location, phone, result):
		# send message
	if result == 'Positive':
		body_head = 'Sorry to inform you, '
	else:
		body_head = 'Glad to inform you, '

	client.messages.create(
		to=phone,
		from_='+12513599413',
		body=body_head + 'your latest COVID-19 at {} test result is {}'.format(location, result)
	)

	return {'status': 'SUCCESS',
			'message':'Message Sent.'}

	# handling request from /api/record
@app.route('/api/record/<int:limit>', methods = ['GET'])
def get_record(limit):
	# query from db order by date with descending order with limit size
	records = Record.query.order_by(desc(Record.date)).limit(limit).all()
	data = [rec.to_dict() for rec in records]

	return {'status': 'SUCCESS',
			'data': data}

	# handling post request from /api/record
@app.route('/api/record', methods = ['POST'])
def post_record():
	data = json.loads(request.data.decode('utf-8'))
	record = Record.from_dict(data)
	db.session.add(record)
	db.session.commit()

	return {'status': 'SUCCESS',
			'data': data}

	# handling get request from /api/record/all_pos
	# clustering api
@app.route('/api/record/all_pos', methods = ['GET'])
def get_all_pos():
	# query from db filter by all positive cases
	count = Record.query.filter_by(test_result='Positive').count()
	return {'status': 'SUCCESS',
			'data': {
				'count': count,
				'date': date.today().strftime("%b %d, %Y")
			}}

	# handling get request from /api/record/past_seven
	# clustering api
@app.route('/api/record/past_seven', methods = ['GET'])
def get_past_seven_pos():
	days = []
	counts = []

	for i, j in enumerate(range(6, -1, -1)):
		# get past seven days
		days.append(datetime.today() - timedelta(days=j))
		# query from db filter by positive cases in past seven days
		counts.append(Record.query.filter(Record.test_result=='Positive', Record.date==datetime.strptime(days[i].strftime('%Y-%m-%d'), '%Y-%m-%d')).count())
		
	
	# integrate the data
	data = [{'day': days[i].strftime('%b %d'), 'count': counts[i]} for i in range(7)]


	return {'status': 'SUCCESS',
			'data': data }



