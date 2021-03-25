#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdksnsSlackMailStack } from '../lib/cdksns-slack-mail-stack';

const app = new cdk.App();
new CdksnsSlackMailStack(app, 'CdksnsSlackMailStack');
