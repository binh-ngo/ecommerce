import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import { BlockPublicAccess, Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";


export class ECommerceFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'ECommerceFrontendBucket', {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
    });

    new BucketDeployment(this, 'DeployECommerceFrontend', {
      sources: [Source.asset('../frontend/build')],
      destinationBucket: bucket,
    });

    new CloudFrontWebDistribution(this, 'ECommerceFrontendCFDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

  }
}