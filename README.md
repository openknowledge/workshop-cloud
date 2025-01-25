# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Motivation 

Welcome to the open knowledge hands-on cloud workshop based on [AWS](https://aws.amazon.com/console/) 
and [GitHub Codespaces](https://github.com/features/codespaces). 

During this workshop you will learn how to build up and improve a cloud-based application. 
Starting with a simple lift & shift scenario using plain cloud compute resources, you will 
step-by-step get to know and integrate different managed cloud platform services and so 
improve the solution with each exercise of this workshop.

**Note:** 
> Even though the exercises are tailored to the AWS cloud platform, most of the paradigms 
and patterns shown can be applied 1:1 to other cloud providers, too. 

## Prerequisite

To attend the workshop, all you need is a [GitHub](https://github.com/) account. 
Every thing else you will need to participate - especially the AWS cloud access - is provided 
by [open knowledge](https://www.openknowledge.de). **If you do not have an GitHub account** 
so far, just [sign up to GitHub for free here](https://github.com/).

## Agenda 

As mentioned above, the Workshop consists of several hands-on exercises that teach how to 
use the various Cloud components. Specifically, the workshop consists of the following exercises, 
each of which is managed in its own branch:

### Step 0: On-Premise

Initial setup of the GitHub Codespace and get to know the demo application.

Jump to branch [0\_on\_premise](https://github.com/openknowledge/workshop-cloud/tree/0_on_premises)

### Step 1a: Lift & Shift - part 1

Lift & shift of the demo application without any changes to an in advance provisioned EC2 instance.

Jump to branch [1a\_lift\_and\_shift](https://github.com/openknowledge/workshop-cloud/tree/1a_lift_and_shift)


### Step 1b: Lift & Shift - part 2

Enhance the previous version of "lift & shift - part 1" by using an EC2 launch template and 
a loadbalancer to make the provisioning and application installation reproducible and scalable.

Jump to branch [1b\_lift\_and\_shift](https://github.com/openknowledge/workshop-cloud/tree/1b_lift_and_shift)

### Step 2: Managed Cloud Services 

Make use of the AWS managed cloud services AppRunner and Elastic Container Repository (ECR) instead 
of directly provisioning the EC2 instance and installing the application.

Jump to branch [2\_managed\_services](https://github.com/openknowledge/workshop-cloud/tree/2_managed_services)

### Step 3: Platform as a Service (PaaS)

Replace proprietary data storage service of the application with the cloud managed platform noSql 
service DynamoDB.  

Jump to branch: [3\_paas](https://github.com/openknowledge/workshop-cloud/tree/3_paas)

### Step 4: Serverless Functions (Lambda)

Adding a serverless function to the current state of the cloud landscape developed 
so far in order to be able to react to cloud events.  

Jump to branch: [4\_lambda](https://github.com/openknowledge/workshop-cloud/tree/4_lambda)
