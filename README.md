# Airalo

**Instructions on how to set up and run each test**
**For MAC users**
1. Install Homebrew - To do this, open a terminal window and run the following command:
```   
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
2. Install nvm - you can use it to install nvm by running the following command:
```
 brew install nvm
```
3. Add nvm to your shell profile: To make nvm available every time you open a new terminal window, you will need to add the following line to your shell profile     (e.g., ~/.bash_profile or ~/.zshrc):
```
   source $(brew --prefix nvm)/nvm.sh
```

4. Install Node.js
Once nvm is installed, you can use it to install the latest version of Node.js by running the following command:
```
   nvm install node
```

5. Install @playwright/test library by using the below mentioned command:
```
   npm i -D @playwright/test
```

6. Checkout the code from Git
7. Navigate to `Airalo-main`
8. Execute the following command to run all the UI and API automation test:
```
npx playwright test
```
Alternatively, you can also run the same tests in UI mode by using the following command:
```
npx playwright test --ui
```
 >**Note: In case of UI mode you need to press on the play icon on the left pannel to execute the respective tests.** 
 
9. After running the test you can see the test report by using the following command:
```
npx playwright show-report
```

    






