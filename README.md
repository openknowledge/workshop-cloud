# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Motivation 

Welcome to the open knowledge hands-on cloud workshop based on [AWS](https://aws.amazon.com/console/) 
and [GitHub Codespaces](https://github.com/features/codespaces). 

During this workshop you will learn step-by-step how to build up and improve a cloud-based application. 
Starting with a simple lift & shift scenario using plain cloud compute resources, you will get to know and 
integrate several managed cloud platform services to successively improve the solution in this way.

**Note:** 
> Even though the various exercises are tailored to the AWS Cloud, most of the paradigms and patterns 
shonw during the workshop can be applied 1:1 to other cloud providers.

## Prerequisite

To attend the workshop, all you need is an [GitHub](https://github.com/) account. 
Every thing else you will need to participate - especially the AWS cloud access - is provided 
by [open knowledge](https://www.openknowledge.de). **If you do not have an GitHub account** so far, just [sign up to GitHub for free](https://github.com/).

## Agenda 

The workshop is structured as follows:

### Step 0: On-Premise

Initial setup of the GitHub Codespace and get to know the demo application.

Branch: [0_on_premise](https://github.com/openknowledge/workshop-cloud/tree/0_on_premises)

### Step 1: Lift & Shift - part 1

Lift & shift of the demo application without any changes to an in advance provisioned EC2 instance.

Jump to branch: [1a_lift_and_shift](https://github.com/openknowledge/workshop-cloud/tree/1a_lift_and_shift)


### Step 2: Lift & Shift - part 2

Enhance the previous version of "lift & shift - part 1" by using an EC2 launch template and a load balancer  
to make the provisioning and application installation reproducible and scalable.

Jump to branch: [1b_lift_and_shift](https://github.com/openknowledge/workshop-cloud/tree/1b_lift_and_shift)

### Step 3: Managed Cloud Services 

Make use of the AWS managed cloud services AppRunner and ECR (Elastic Container Repository), instead of directly 
provisioning the EC2 instance and installing the application.

Jump to branch: [2_managed_services](https://github.com/openknowledge/workshop-cloud/tree/2_managed_services)

### Step 4: Platform as a Service (PaaS)

Replace proprietary services of the application (repository) with cloud managed platform services (dynamoDB noSQL).   

Jump to branch: [3_paas](https://github.com/openknowledge/workshop-cloud/tree/3_paas)

### Step 5: Serverless Functions (Lambda)

Add a serverless function to the current state of the so far evolved cloud landscape to be able to react on cloud events,
e.g. changes in the dynamoDB database. 

Jump to branch: [4_lambda](https://github.com/openknowledge/workshop-cloud/tree/4_lambda)
