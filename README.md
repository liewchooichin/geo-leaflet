# Manual Deployment to Azure Static Web Apps

The problem with the VS Code automatic deployment is that the env var in **.env** cannot be read in the deployed iste. Manual deployment is **necessary** for the env var VITE_XXX.

Follow the steps below for manual deployment:

```
# Install SWA

# Get the deployment token either from Azure portal or using **azure cli** using `secrets list` command.

# The <APPLICATION_NAME> is the name of the **resource** that is used in the Azure portal for the web app.

az staticwebapp secrets list --name <APPLICATION_NAME> --query "properties.apiKey"

# Create a swa-cli.config.json
# Check that the values are correct.

swa init

# Build the vite app
# The /dist folder will be created. This is the folder
# that will be deployed to the web app service.
npm run build

# Default deployment to preview
$ swa deploy ./dist 
  --deployment-token $SWA_CLI_DEPLOYMENT_TOKEN

# Deploy to production
$ swa deploy ./dist 
  --deployment-token $SWA_CLI_DEPLOYMENT_TOKEN 
  --env production
```