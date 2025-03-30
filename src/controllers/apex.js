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
    res.send({
        "terms_and_conditions": {
          "effective_date": "3/30/2025",
          "acceptance_of_terms": "By using SatoLove, you agree to these Terms & Conditions. If you do not agree, please do not use the app.",
          "eligibility": {
            "age_requirement": "You must be 13 years or older to use SatoLove.",
            "instagram_account": "You must have an active Instagram account to register."
          },
          "user_responsibilities": [
            "You are responsible for the content you post and interactions with other users.",
            "You may not use SatoLove for harassment, bullying, or illegal activities."
          ],
          "account_suspension_termination": "We reserve the right to suspend or terminate your account if you violate our guidelines.",
          "limitation_of_liability": "SatoLove is provided 'as is.' We are not responsible for any damages resulting from your use of the app.",
          "changes_to_terms": "We may update these Terms from time to time. Continued use of the app means you accept the changes.",
          "contact": "diginalrogue@gmail.com"
        }
      }
      )
    }catch(e){
        console.log("Error in 'terms' controller of apex router", e.message)
        res.status(500).json("Error loading page!")
    }
}

const privacypolicy = async(req,res)=>{
    try{
        res.json({
            "privacy_policy": {
              "effective_date": "3/30/2025",
              "introduction": "Welcome to SatoLove! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our app.",
              "information_we_collect": {
                "instagram_profile_information": "When you sign up, we collect your username, profile picture, and basic account details through Instagram OAuth.",
                "additional_profile_data": "You may provide optional details such as age, gender, and relationship preferences.",
                "usage_data": "We may collect data on how you use the app to improve our services."
              },
              "how_we_use_your_information": [
                "Create and manage your profile on SatoLove.",
                "Personalize your experience on the platform.",
                "Improve our services and app performance.",
                "Ensure the security and integrity of our platform."
              ],
              "how_we_share_your_information": {
                "statement": "We do not sell your data. We may share limited data only in the following cases:",
                "cases": [
                  "With service providers (such as hosting services) to operate the app.",
                  "If required by law enforcement or to prevent fraud and security threats."
                ]
              },
              "data_security": "We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.",
              "your_rights_and_choices": [
                "You can update or delete your profile at any time.",
                "You may contact us to access, correct, or delete your information."
              ],
              "changes_to_policy": "We may update this policy from time to time. Changes will be posted on this page with a revised effective date.",
              "contact": "diginalrogue@gmail.com"
            }
          }
          )
    }catch(e){
        console.log("Error at 'privacypolicy' controller in router 'apex': ", e.message)
        res.status(500).json("Error loading page!")
    }
}


module.exports={about,main,terms,privacypolicy}