Backend server will have user and admin
user - To verify if he is a member- How do you do that

login- password with otp on registered mobile -Done

NOTICE AND DOCUMENT SECTION- Done

ADMIN DASHBOARD- 

SECURE ONLINE VOTING SYSTEM (WITH OTP/EMAIL AUTHENTICATION)

MOBILE-FRIENDLY INTERFACE

PAYMENT GATEWAY OR SECTION TO SHOW BANK DETAILS FOR MEMBER CONTRIBUTIONS/DONATIONS

💳 A DEDICATED SECTION MUST ALSO DISPLAY OR INTEGRATE A LINK FOR CONTRIBUTION TO OUR ASSOCIATION'S BANK ACCOUNT (UPI/QR CODE OR PAYMENT FORM).

ELECTIONS:

A)
Names of people standing for election
Have to update user model to store selected candidate(year wise)[submit button]

submit -> verify otp -> store the result

B)
To store the counts each candidate is getting year wise
Total number of candidates (To be filled by admin)

// VOTE MODEL EXPLANATION

Explanation of the Vote model
Field	Type	Description
id	Int	Unique identifier for each vote record
userId	Int	Foreign key linking to the User who voted
candidateId	Int	Foreign key linking to the Candidate who was voted for
votedYear	Int	The year this vote was cast — enables tracking votes year-wise
createdAt	DateTime	When the vote was submitted
@@unique([userId, votedYear])	Constraint	Ensures that one user can only vote once per year

So if a user votes in 2025 and again in 2026, two Vote records are created, each linking to a different candidate and year.

🔄 Summary of Relations
One User can cast multiple votes → one per year.

One Candidate can receive many votes.

The Vote table is the junction linking user → candidate → year.
