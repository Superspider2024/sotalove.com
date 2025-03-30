const express= require("express")


const main=async(req,res)=>{
    try{
    res.send("this is main page!")
    }catch(e){
        console.log("Error in 'main' controller of apex router: ", e.message)
        res.status(500).json("Error loading page!")
    }
}

const about=async(req,res)=>{
    try{
    res.send("this is about page!")
    }catch(e){
        console.log("Error in 'about' controller of apex router: ", e.message)
        res.status(500).json("Error loading page!")
    }
}

const terms=async(req,res)=>{
    try{
    res.send(`Terms & ConditionsEffective Date: 3/30/2025

1. Acceptance of Terms

By using SatoLove, you agree to these Terms & Conditions. If you do not agree, please do not use the app.

2. Eligibility

You must be 13 years or older to use SatoLove.

You must have an active Instagram account to register.

3. User Responsibilities

You are responsible for the content you post and interactions with other users.

You may not use SatoLove for harassment, bullying, or illegal activities.

4. Account Suspension & Termination

We reserve the right to suspend or terminate your account if you violate our guidelines.

5. Limitation of Liability

SatoLove is provided "as is." We are not responsible for any damages resulting from your use of the app.

6. Changes to These Terms

We may update these Terms from time to time. Continued use of the app means you accept the changes.

7. Contact Us

For questions about these Terms, contact diginalrogue@gmail.com.

`)
    }catch(e){
        console.log("Error in 'terms' controller of apex router", e.message)
        res.status(500).json("Error loading page!")
    }
}

const privacypolicy = async(req,res)=>{
    try{
        res.json(`Privacy PolicyEffective Date: 3/30/2025

1. Introduction

Welcome to SatoLove! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our app.

2. Information We Collect

We only collect the information necessary for your use of SatoLove, including:

Instagram Profile Information: When you sign up, we collect your username, profile picture, and basic account details through Instagram OAuth.

Additional Profile Data: You may provide optional details such as age, gender, and relationship preferences.

Usage Data: We may collect data on how you use the app to improve our services.

3. How We Use Your Information

Your information is used to:

Create and manage your profile on SatoLove.

Personalize your experience on the platform.

Improve our services and app performance.

Ensure the security and integrity of our platform.

4. How We Share Your Information

We do not sell your data. We may share limited data only in the following cases:

With service providers (such as hosting services) to operate the app.

If required by law enforcement or to prevent fraud and security threats.

5. Data Security

We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.

6. Your Rights & Choices

You can update or delete your profile at any time.

You may contact us to access, correct, or delete your information.

7. Changes to This Policy

We may update this policy from time to time. Changes will be posted on this page with a revised effective date.

8. Contact Us

If you have any questions, please contact us at diginalrogue@gmail.com.`)
    }catch(e){
        console.log("Error at 'privacypolicy' controller in router 'apex': ", e.message)
        res.status(500).json("Error loading page!")
    }
}


module.exports={about,main,terms,privacypolicy}