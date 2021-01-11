from flask import Flask
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Sequence
from twilio.rest import Client
from os import environ
import datetime
import sshtunnel

# load env variable
load_dotenv()

# configure sms message client
client = Client(environ.get('TWILIO_ACCOUNT_SID'), environ.get('TWILIO_AUTH_TOKEN'))

# create flask app
app = Flask(__name__)

# ssh tunnel configuration
tunnel = sshtunnel.open_tunnel(
	environ.get('DATEBASE_URI'),
	ssh_username=environ.get('SSH_USERNAME'),
	ssh_password=environ.get('SSH_PASSWORD'),
	remote_bind_address=('localhost',  int(environ.get('DATEBASE_PORT'))),
    local_bind_address=('localhost', 1522)
)

# database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = '{}+{}://{}:{}@{}:{}/{}'.format(
    environ.get('DATEBASE_DIALECT'),
    environ.get('DATEBASE_DRIVER'),
	environ.get('DATEBASE_USERNAME'),
	environ.get('DATEBASE_PASSWORD'),
	'localhost',
    '1522',
	environ.get('DATEBASE_SERVICENAME')
)

# initialize db with flask app
db = SQLAlchemy(app)

# ORM model for record
class Record(db.Model):
    __tablename__ = 'covid_record'

    id_seq = Sequence('covid_record_id')
    id = db.Column(db.Integer, id_seq, server_default=id_seq.next_value(), primary_key=True)

    employee_id = db.Column(db.Integer)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    test_result = db.Column(db.String(40))
    date = db.Column(db.Date)
    location = db.Column(db.String(255))
    phone = db.Column(db.String(40))

    def to_dict(self):
        return {
            'id' : self.id,
            'date': datetime.datetime.strftime(self.date, '%d %B, %Y'),
            'employeeId': self.employee_id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'testResult': self.test_result,
            'location': self.location,
            'phone': self.phone
        }

    @classmethod
    def from_dict(cls, in_dict):
        cls = Record()
        if (in_dict['date']):
            cls.date = datetime.datetime.strptime(in_dict['date'], '%Y-%m-%d')
        cls.employee_id = in_dict['employeeId']
        cls.first_name = in_dict['firstName']
        cls.last_name = in_dict['lastName']
        cls.test_result = in_dict['testResult']
        cls.location = in_dict['location']
        cls.phone = in_dict['phone']
        return cls