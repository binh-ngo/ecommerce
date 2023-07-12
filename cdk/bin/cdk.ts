#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ECommerceFrontendStack } from '../lib/ecommerce-frontend-stack';

const app = new cdk.App();
new ECommerceFrontendStack(app, 'ECommerceFrontendStack', {});