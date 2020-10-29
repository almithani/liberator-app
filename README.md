# liberator-app
Frontend code for liberator app

## dev info
I'm using a really old version of react, so I should document how to publish stuff so I don't forget.  Here are some notes for you Al:

* check out local password storage system for any credentials you'll need.  The entry is called "Liberator client/server"
* your local folder is using Sublime Text w/ Sublime SFTP to upload to the staging site automatically
* you still have to transpile .jsx file to .js to see your changes on the staging site.  for that you can `npm run prepublish`
    * i feel like there is a way to auto transpile, but I forget what it is
* once you're happy with the stage site, commit to master on git and pull on the remote server to have your changes on the production site
