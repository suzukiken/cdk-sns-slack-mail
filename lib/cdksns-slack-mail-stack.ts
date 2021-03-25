import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as iam from "@aws-cdk/aws-iam";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import * as ssm from "@aws-cdk/aws-ssm";

export class CdksnsSlackMailStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX_NAME = id.toLocaleLowerCase().replace("stack", "")
    const MAIL_ADDRESS = 'user@example.com';
    const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/....../.......';
    
    const lambda_function = new PythonFunction(this, "lambda_function", {
      entry: "lambda",
      index: "slack_webhook_function.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME + "-slack",
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.seconds(10),
      environment: {
        SLACK_WEBHOOK_URL: SLACK_WEBHOOK_URL,
      }
    });

    const topic = new sns.Topic(this, "topic", {
      fifo: false,
      topicName: PREFIX_NAME + "-topic",
    });

    topic.addSubscription(
      new subscriptions.LambdaSubscription(lambda_function)
    );

    topic.addSubscription(new subscriptions.EmailSubscription(MAIL_ADDRESS));

    const policy_statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["sns:Publish"],
      principals: [new iam.ServicePrincipal("events.amazonaws.com")],
      resources: [topic.topicArn],
    });

    topic.addToResourcePolicy(policy_statement);
    
    new ssm.StringParameter(this, "stringparameter", {
      parameterName: "sns-topic-name",
      stringValue: topic.topicArn,
    });

  }
}
