# Contributing

**Thank you for considering contributing to this project!**

Before you doing so, **please read the following simple steps** on how to contribute. 
This will **make life easier and help to avoid wasting time** on things, which are not requested.

## Run through the Development Guide

Check out the short, but concise [**development guide**][devel-url] for tools, structure, and commands.  

## Discuss the changes before doing them

 - First of all, **open an issue in the repository** [**using the bug tracker**][bug-tracker-url] 
   **and describe the contribution** you would like to make, the bug you found or any other ideas you have.
   This will help to get you started on the right foot.
   
 - **If it makes sense**, add the platform and software information *(e.g.: operating system, Node.js version etc.)* 
   and/or screenshots so we can see what you are seeing.
 
 - It is recommended to **wait for feedback before continuing** to the next steps. However, 
   if the issue is clear *(e.g.: a typo)* and the fix is simple, you can continue and fix it.

## Fixing issues

 - Fork the project in your account and **create a branch with your fix** using 
   the naming style: **some-awesome-feature** or **some-issue-fix**.

 - Commit your changes in that branch. Make sure you follow [**StandardJS**][stdjs-url] and the **tests** and 
   the **precommit hook** ran without errors:
   
   ```bash
   # Run all tests with style and coverage checks
   npm run test
   ```
   
 - In **package.json**, add yourself to the [**array of contributors**][arr-contrib-url]
   *(if the array doesn't exist, create it)*:
 
   ```json   
   {
      "contributors": [
         "Your Name <your.mail@email.com> (http://your.website)"
      ]
   }   
   ```
 
## Creating a pull request

 - Open a pull request and **reference the initial issue** [**in the pull request message**][pull-req-url] 
   *(e.g.: fixes #42)*. Write a **good description and title**, so everybody will know what is fixed/improved.

 - **If it makes sense**, add screenshots, gifs, etc., so it will be easier to see what is going on.

## Wait for feedback

**Your contributions will be reviewed before accepting them.**
You may get feedback about what should be fixed/changed in your modified code.

## THANK YOU!


  [bug-tracker-url]: https://github.com/ntbx/get-sri/issues
  [stdjs-url]:       https://standardjs.com
  [arr-contrib-url]: https://docs.npmjs.com/files/package.json#people-fields-author-contributors
  [pull-req-url]:    https://blog.github.com/2013-05-14-closing-issues-via-pull-requests
  [devel-url]:       https://github.com/ntbx/get-sri/blob/master/DEVELOPMENT.md
