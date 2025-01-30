# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Infrastructure as Code (IaC)

So far, we have worked exclusively with the AWS Management Console or AWS CLI in this 
hands-on cloud workshop. Even if these two approaches help us to better understand the 
basics of cloud computing, they make it unnecessarily difficult to build reproducible or 
parameterisable systems on a professional basis. 

To close this gap we will learn how to use Infrastructure as Code (IaC). With the help of IaC, 
target scenarios in the cloud can be described declaratively and then realised with the help of 
an appropriate tools - in our case [Terraform](https://www.terraform.io). 

IaC Tooling not only helps with setting up a cloud environment, but also with changing it and 
dismantling / destroying it cleanly. 

During this exercise you will learn how to:

- Initialize an IaC environment  
- Plan a cloud environment via IaC
- Apply aka realize a cloud environment via IaC
- Change an existing cloud environment via IaC
- Destroy an existing cloud environment via IaC

**Note:**
> Make sure you are on branch `1a_lift_and_shift`.

### Log into AWS Cloud via CLI

Before being able to use IaC for our AWS cloud environment, we first have 
to connect to AWS via AWS cli. This step ensures that Terraform uses the 
desired AWS account - which is YOUR account - for the IaC commands.

**Note**: Codespaces remembers your AWS connection. If you see your login information
already filled in just confirm by pressing `[ENTER]`.

1. open a new terminal in Codespaces using the terminal tab
2. Configure your AWS connection using the `aws configure` command that will
   ask you step by step for all relevant information to sign in to AWS via cli:

    ```sh
    $ aws configure
       
    AWS Access Key ID [None]: [YOUR AWS ACCESS KEY]
    AWS Secret Access Key [None]: [YOUR SECRET ACCESS KEY]
    Default region name [None]: eu-central-1 
    Default output format [None]: json
    ```

3. Make an AWS CLI call to test connection, e.g. asking for the caller identity (aka YOU):

    ```shell
    $ aws sts get-caller-identity
    ```

   The output should look something like ...

    ```json lines
    {  
       "UserId": "AIDASVQKHPCR2LKF6UHNT",
       "Account": "183631313059",
       "Arn": "arn:aws:iam::183631313059:user/dog"
    }  
    ```
   
### Initialize an IaC environment

**Note**: In contrast to the other steps, this step only needs to be carried out once 
for the workshop environment.

The first step is to initialise our IaC environment in order to load and install a provider 
for the AWS Cloud, among other things. 

1. Open new terminal in Codespaces via terminal tab. 
2. Goto terraform folder 

    ```
    cd app/terraform
    ```
3. Familiarise yourself with the Terraform script `main.tf`
4. To intialize the IaC environment, call 

   ```
   terraform init
   ```

   The output will something look like 

   ```
   Initializing the backend...

   Initializing provider plugins...
   - Reusing previous version of hashicorp/random from the dependency lock file
   - Reusing previous version of hashicorp/aws from the dependency lock file
   - Using previously-installed hashicorp/random v3.6.3
   - Using previously-installed hashicorp/aws v5.84.0
   ```

You should find at least the AWS provider `hashicorp/aws` inside the output. 

### Plan a cloud environment via IaC

Before making changes to the Cloud setup via IaC, it makes sense to check in advance what
exactly these changes would look like.

Terraform provides the `plan`command for this purpose. The `plan`command  calculates the necessary 
changes between the current state and the target state declared in the Terraform script(s) and outputs 
these changes for your convenient.

1. Goto or open terminal in Codespaces via terminal tab.
2. Make sure you are still inside the terraform folder:

   ```
   pwd  
   cd /workspaces/workshop-cloud/app/terraform
   ```
3. List potential changes to the cloud environment when applying the `main.tf` script:   

   ```
   terraform plan
   ```

The output will list several cloud components and operations to be performed on them. 

### Apply aka realise a cloud environment via IaC

Ok, now it's time to not only plan but also apply the changes! 

1. To do so (apply the terraform script(s) ), just call 

   ```
   terraform apply
   ```
2. You will see the planed changes and be asked to enter `yes` to perfom the actions described:  

   ```
   Do you want to perform these actions?
     Terraform will perform the actions described above.
     Only 'yes' will be accepted to approve.

     Enter a value:
   ```

Terraform then executes the individual actions of the script and displays a success / failure 
messages for each. If any output defined inside the script, it will be displayed at the end
of the output. In our case the output should display the DNS of the juts created application domain: 

   ```
   app_domain = "ec2-3-78-183-191.eu-central-1.compute.amazonaws.com"
   ```

**Note*: You can reproduce the output later at any time by calling `terraform output`. 

If you want to make sure that everything went well during this exercise, go through 
the following steps: 

1. Log into AWS management console via your credentials: https://console.aws.amazon.com
2. Open EC2 Dashboard
3. List EC2 Instances (via Instances in menu on the left)

You should see an EC2 instance with your animal as prefix followed by a random hex sequence.
To ensure that this is the correct instance, compare the output of the terraform apply call 
with the DNS of the EC2 instance. 

### Change an existing cloud environment via IaC

If you want to change something for your existing cloud setup, e.g. the `instance_type`, 
the java version to be installed (via `user_data`) or the port settings (via `ws_security_group`)
you only have to change the related part of the terraform script and call   

   ```
   terraform apply
   ```

Terraform calculates and displays the actions to perform the changes and applies them afterwards. 

### Destroy an existing cloud environment via IaC

It's a kind of best practice to use terraform (IaC) not only to build up and change your 
cloud environment but also to dismantle / destroy it in a clean way. Using terraform instead 
of the web based AWS management console helps to dismantle the resources that 
have been built up in the background, e.g. using a wizard - there are usually 
quite a few of them!

To dismantle the resources built up in the previous steps due to the use of Terraform call: 

   ```
   terraform destroy
   ```

As already learnt in section the 'Apply aka realise a cloud environment via IaC' you will see 
a list of potential changes (deletes) and have to confirm them with `yes`.  

### Congratulations 

Even so this exercise was quite short and simple, using IaC is one of the most important steps 
from clickOps to cloudOps. So, right now you can really CALL YOURSELF A CLOUD ENGINEER!   
