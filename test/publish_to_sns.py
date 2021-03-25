import boto3
from datetime import datetime

client = boto3.client('sns')

response = client.publish(
    TopicArn='arn:aws:sns:ap-northeast-1:000000000:cdksnsslackmail-topic',
    Message='Hi. {}'.format(datetime.now().isoformat()),
    Subject='test'
)