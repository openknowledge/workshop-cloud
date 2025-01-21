# Hands-On Cloud Workshop
powered by open knowledge 

## Motivation 

Welcome to the open knowledge hands-on cloud workshop based on AWS and GitHub codespaces. 

During this workshop you will learn step-by-step how to build up and improve a cloud-based application. Starting with a simple lift & shift scenario using plain cloud compute resources, you will get to know and 
integrate several managed clod platform services to successively improve the solution in this way.

## Agenda 

The workshop is structured as follows:

### Step 0: On-Premise 

Initial setup of the GitHub codespace and get to know the demo application. 

### Step 1: Lift & Shift - part 1

Lift & shift of the demo application without any changes to an in advance provisioned EC2 instance.  

### Step 2: Lift & Shift - part 2

Enhance the previous version of "lift & shift - part 1" by using an EC2 launch template and a load balancer  
to make the provisioning and application installation reproducible and scalable.

### Step 3: Managed Cloud Services 

Make use of the AWS managed cloud services AppRunner and ECR (Elastic Container Repository), instead of directly 
provisioning the EC2 instance and installing the application.  

### Step 4: Platform as a Service (PaaS)

Replace proprietary services of the application (repository) with cloud managed platform services (dynamoDB noSQL).   

### Step 5: Serverless Functions (Lambda)

Add a serverless function to the current state of the so far evolved cloud landscape to be able to react on cloud events,
e.g. changes in the dynamoDB database. 
