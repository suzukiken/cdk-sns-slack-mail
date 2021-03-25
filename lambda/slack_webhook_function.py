import os
import requests

def lambda_handler(event, context):

    print(event)

    url = os.environ.get('SLACK_WEBHOOK_URL')

    headers = {
        'Content-Type': 'application/json',
    }

    data = None

    for record in event['Records']:
        if record['EventSource'] == "aws:sns":
            data = {
                'text':
                "Subject: {} Message: {} Timestamp: {}".format(
                    record['Sns']['Subject'], record['Sns']['Message'],
                    record['Sns']['Timestamp'])
            }

    if data:
        res = requests.post(url, json=data, headers=headers)

        print('res {}'.format(res.text))
