# Checkout

## Description
Checkout is a webshop that sells holidays for cheap prices. In the web shop, you can browse through all the destinations and add any destination you want to your cart. When you've added it to your cart, you can make a payment via Stripe. However, in order to make a payment, you must first register and log in. Then you can make your purchase. The purchase will be handled by the third-party service Stripe, then it will redirect back to the web shop where the customer is informed that the order has gone through. All the orders will be saved in a JSON file on the server-side. Also, all the customers will be saved to users.json.

## Requirements
- Node.js installed on your machine
- Clone the repository from [here](https://github.com/jennikaelisson/checkout)
- You need to get your own Stripe API key to be able to use the application. Add your Stripe API key on the server-side in an `.env` file that will be picked up by `stripe.js`.

## How to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/jennikaelisson/checkout

2. Navigate to the project directory:
  cd checkout

3. Install client-side dependencies:
  cd client
  npm install

4. Install server-side dependencies:
  cd ../server
  npm install

5. Run the client:
   cd ../client
   npm run dev

6. Run the server:
   cd ../server
   node server

## Help

If you encounter any issues or have questions about the project, please feel free to contact the project creator @jennikaelisson or open an issue on GitHub.

## Project Owner and Contributor

The project is maintained and solely contributed to by Jennika Elisson.
