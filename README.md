## Crypto - POS 



### Features
- User can login with email and password
- User can sign up 
	- Email 
	- Password 
	- Name
	- Business Name 
- User can navigate to the CoinPayments website via a webview, create a wallet and associate their wallet their business. 
- User can add new items with a price amount in dollars 
- User can add items to their cart 
- FINISH

## TODO 

### Backend 

- [ ] API __(Ryan)__ 
	- [ ] Create Transaction 
	- [ ] Login User
	- [ ] Create User
	- [ ] Connect User to Coinpayment wallet 
- Data Scheme 
	- [ ] User 
	- [ ] Items   
- Mock Data
	- [ ] Items 
	- [ ] Market
	- [ X ] Coins / Currencies   

### Frontend + UI 

- Navigation 
	- [ X ] Tab bar 
	- [ ] Cart + Payment __(Thomas)__	
	- [ ] User Auth Flow 
- Redux 
	- [ ] Selected Items 
	- [ ] User  
	- [ ] Coin Amounts 
- POS (home) __(Thomas)__
	- [ ] Segmented controller w/ Categories
	- [ ] 
- Cart __(Thomas)__
	- [ ] Flatlist w/Items
	- [ ] Checkout Button to Payment
	- [ ] Redux Store for Selected Cart Items
	- [ ] Quanity and Total Calculations 
- Payment  
	- [ ] Display QR code
	- [ ] Display 
	- [ ] Transaction Verification Modal 
- Market
	- [ ] Find Crypto / Currency API __(Mitul)__
	- [ ] Flatlist 
	- [ ] Flatlist item
		- [ ] Coin (Example: BTC)
		- [ ] Fullname (Example: Bitcoin) 
		- [ ] Amount in Dollars ($55.65) 

### API's 
- [CoinPayments](https://www.coinpayments.net/) 
	- 

### Technology Stack 
 - DataBase: __Postgresql__ 
 - Server: __Express.js__ 
 - __Node.js__ 
 - CoinPayment Client 
 - React Native 

### Design Guide
- Gradient Background 
	- [ ] Pick Exact gradient __(Ryan)__
	- Dark, contrasts well with white for lines and text. 
- Colors 
	- [ ] Text 
- Theme? 


## Wireframes

### *Launch Screen + Logo*
<div style={{display: flex; flex-direction: row}}>
  <img src="wireframes/icon.png" width="250" />
  <img src="wireframes/splash.png" width="250" />
</div>


<div style={{display: flex; flex-direction: row}}>
  <img src="s/events_screen_1.png" width="250" />
  <img src="screenshots/events_screen_2.png" width="250" />
  <img src="wireframes/events_screen_3.png" width="250" />
</div>

<div style={{display: flex; flex-direction: row}}>
	<img src="screenshots/event_detail_screen.png" width="250" />
</div>
