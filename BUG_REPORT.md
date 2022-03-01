##BUG REPORT

------

#Lodgify Pricing feature

##**BUG - Summary:** Phone number is not mandatory

**Steps to reproduce:**
1. Go to Contact page
2. Select 'April 14th' for arrival data and 'June 14th' for departure data.
3. Write a random 'Lorem ipsum' comment.
4. Click on 'Send' button.

**Actual result:** Phone is not mandatory, no warning message appears.

**Expected result:** A warning message with "Phone number is mandatory" should appear.

**Environment:** local environment / Chrome browser

**Test Case executed**: Fill dates and comment and verify mandatory fields

**Test Case executed**: Do not fill any field and verify mandatory fields

------

# Lodgify Contact feature

##**BUG - Summary:** Value for Ultimate plan is wrong for 5 rentals

**Steps to reproduce:**
1. Go to Pricing page
2. Select '50' as number of rentals
3. Scroll down to Ultimate plan

**Actual result:** The price for 50 rentals for Ultimate plan is $518.

**Expected result:** The amount for 50 rentals for Ultimate plan should be $525.

**Environment:** local environment / Chrome browser

**Test Case executed**: Verify Yearly plan
