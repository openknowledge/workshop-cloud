# Hands-On Cloud Workshop
powered by [open knowledge](https://www.openknowledge.de)

## Step 2: Managed Services (simple version)

In this exercise, we want to take our current status of the lift & shift solution to the next level.
To this end, we want to automate the provisioning and thus make it reproducible. Instead of installing
the Java runtime and the backend service manually, we will use a EC2 launch template.

In addition, we will scale our service to more than one instances and use a load balancer to route the
incoming traffic to one of these instance. The load balancer helps us to connect the internet with the
internal cloud environment by securing and forwarding the externals to a so-called target group. The
target group in turn routes the incoming calls to the available targets (aka EC2 instances).

See [AWS target groups for your application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html)
for more details.

During this exercise you will:
- Log into the AWS Cloud
- Create an EC2 launch template
- Create a target group for routing purpose
- Create a load balancer delegating incoming traffic to the target group
- Create an autoscaling group using the launch template
- Test your setup from out of the cloud
- Connect the frontend with the backend


In this exercise, we will take our first steps in the cloud. To this end, we will provision
an EC2 compute instance in the AWS cloud and then install our application on this backend and
start it as an externally accessible service.

**Note:**
> Make sure you are on branch `1a_lift_and_shift`.


# 2 – Managed Services

In this exercise we use AppRunner instead of EC2 to deploy our backend. To do this, a Dockerfile was added that creates a Docker image running our backend.

Note: Make sure you are on branch `2_managed_services`.

1. Run `aws configure` and use the user information provided to you on paper

    - Use the region of your user
    - As default output use the json or yaml (you may also just press enter)
    - If everything worked, you can now use the AWS CLI from your console

2. Create an image registry (known as repository) in AWS using ECR. This allows to actually push our newly build Docker image.

    - Name it after your user and leave everything else as is.

3. Build a new version of the backend
    - Make sure you're in the app folder
    - Run `mvn clean package`

4. Build Docker image and push to our new ECR repository

    - Open the new ECR repository and click on "View push commands"
    - Follow the instructions there (login, build, tag and push)

5. Create a new app runner service

    - Go to the AppRunner page and start to create a new service
    - Select container registry and the latest image in our ECR repository
    - Set deployment trigger to automatic (we will benefit from this later on)
    - As service role use the existing "AppRunnerECRAccessRole" role
    - Name the service after your user name
    - As Instance Role use the existing "AppRunner" role
    - Leave everything else as is
    - Create and deploy the service

6. Connect the frontend to AppRunner service

    - Adjust the showcase "2 – Managed Services" in showcases.ts
    - Set the base URL using the default domain of your app runner service
    - Select showcase "2 – Managed Services" and check if the app works properly
