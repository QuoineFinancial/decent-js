# Quick look into DECENT

## The new way of publishing

 Our intention is to revolutionize digital distribution across the Internet.

 DECENT Network is a content distribution platform that is decentralized,
 open-source and uses Blockchain technology. Blockchain technology guarantees
 trust and security by embedding encryption at the lowest level.
 Perhaps the greatest benefit of this implementation of blockchain technology
 is invariant storage for published content which can eliminate manipulation
 and influence by any sort of middleman (eg. publisher). In short content can
 now be created and delivered directly with any fees collected solely by
 the seller at the point of sale. In addition to the technological side,
 there are the economical and social protocols that will govern real-world
 interactions across the network. In order to make transactions viable and
 user friendly a crypto-token, the DCT, has been implemented. The encrypted
 DCT tokens help mitigate attacks, promote funding and ensure transaction
 validation. One last thing of note, unlike other content distribution platforms
 underdevelopment, there are virtually no limitations as to the type of media that
 can be published on DECENT Network. It could be songs, books, articles, videos,
 source code, or anything really and in almost any format.


# decent-js

Javascript library to work with Decent blockchain network.


## Quick start

### Installation

 1. Install `Node.js >6` and `npm >3` globally
 
 2. Change directory to project root dir
 
 3. Install `npm install git+https://github.com/DECENTfoundation/decent-js.git` OR 
 add `"decent-js": "git+https://github.com/DECENTfoundation/decent-js.git"` dependency to your `package.json` file.
 
### Initialize library

    const config = {
        decent_network_wspaths: ['wss://your.decent.daemon:8090'],
        chain_id: 'your-decent-chain-id'
    };
    
    Decent.initialize(config);
    
Replace `decent_network_wspaths` with active decent daemon instance and `chain_id` with blockchain id which
you are about to work on.
<!-- [Init example](https://github.com/DECENTfoundation/decent-js/tree/master/examples/Init) -->

## Usage

Once Decent lib is initialized, you can access methods using `Decent.instance().core`

## Search content method
    
    const term = 'some phrase';
    const order = SearchParamsOrder.createdDesc;
    const user = '1.2.345';
    const region_code = 'en';
    const itemId = '0.0.0';
    const category = '1';
    const count = 4;
    
    const searchParams: SearchParams = new SearchParams(
        term, order, user, region_code, itemId, category, count
    );
    Decent.core.content.searchContent(searchParams)
        .then((contents: Content[]) => {
            console.log(contents);
        })
        .catch(err => {
            console.log(err);
        });

Replace all variables with your values to get requested content.
<!-- [Search example](https://github.com/DECENTfoundation/decent-js/tree/master/examples/SearchContent) -->


## Buy content method

    const contentId = '1.2.3';
    const accountId = '1.3.45';
    const privateKey = 'ac7b6876b8a7b68a7c6b8a7c6b8a7cb68a7cb78a6cb8';
    const elGammalPublic = '704978309485720398475187405981709436818374592763459872645';
    
    Decent.core.content.buyContent(
        contentId,
        accountId,
        elGammalPublic,
        privateKey)
        .then(() => {
            // Content successfully bought
        })
        .catch(() => {
            // buy unsuccessful, handle buy error
        });
       
Replace variables with keys from your decent account to buy content. Otherwise you will not be 
able to buy content. Private key must be in WIF(Wallet Import Format).
<!-- [Buy example](https://github.com/DECENTfoundation/decent-js/tree/master/examples/BuyContent) -->

## Download/Restore content method
Method `restoreContentKeys` will restore your key generated during content submission, used to encrypt content. 

    const elGammalPrivate = '32983749287349872934792739472387492387492834';
    const contentId = '1.2.312';
    const accountId = '1.2.312';
    
    // Content key restoration
    Decent.core.content.restoreContentKeys(contentId, accountId, elGammalPrivate)
        .then(key => {
            // ... now you are able to decrypt your content
        })
        .catch(err => {
            // error restoring key
        });
        
<!-- [Download example](https://github.com/DECENTfoundation/decent-js/tree/master/examples/DownloadContent) -->


## All available methods

### Content

    searchContent(searchParams: SearchParams): Promise<Content[]> 
    getContent(id: string): Promise<Content> 
    removeContent(contentId: string, authorId: string, privateKey: string): Promise<void> 
    restoreContentKeys(contentId: String, accountId: string, ...elGammalPrivate: KeyPair): Promise<string> 
    generateContentKeys(seeders: string[]): Promise<any> 
    addContent(content: SubmitObject, privateKey: string): Promise<void> 
    buyContent(contentId: string, buyerId: string, elGammalPub: string, privateKey: string): Promise<void> 
    
### Account

    getAccountByName(name: string): Promise<Account> 
    getAccountById(id: string): Promise<Account> 
    getTransactionHistory(accountId: string, privateKeys: string[], order: string = SearchAccountHistoryOrder.timeDesc, startObjectId: string = '0.0.0', resultLimit: number = 100): Promise<Transaction[]> 
    transfer(amount: number, fromAccount: string, toAccount: string, memo: string, privateKey: string): Promise<void> 
    getBalance(accountId: string): Promise<number> 

