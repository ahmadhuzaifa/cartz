const SQUARE_APP_ID = 'REPLACE_ME';
// Make sure to remove trailing `/` since the CHARGE_SERVER_URL puts it
const CHARGE_SERVER_HOST = 'REPLACE_ME';
const CHARGE_SERVER_URL = `${CHARGE_SERVER_HOST}/chargeForCookie`;
const GOOGLE_PAY_LOCATION_ID = 'REPLACE_ME';
const APPLE_PAY_MERCHANT_ID = 'REPLACE_ME';
// constants require for card on file transactions
const CREATE_CUSTOMER_CARD_SERVER_URL = `${CHARGE_SERVER_HOST}/createCustomerCard`;
const CHARGE_CUSTOMER_CARD_SERVER_URL = `${CHARGE_SERVER_HOST}/chargeCustomerCard`;
const CUSTOMER_ID = 'REPLACE_ME';
module.exports = {
  SQUARE_APP_ID,
  CHARGE_SERVER_HOST,
  CHARGE_SERVER_URL,
  GOOGLE_PAY_LOCATION_ID,
  APPLE_PAY_MERCHANT_ID,
  CUSTOMER_ID,
  CREATE_CUSTOMER_CARD_SERVER_URL,
  CHARGE_CUSTOMER_CARD_SERVER_URL,
};





// curl https://connect.squareupsandbox.com/v2/customers \
//   -X POST \
//   -H 'Square-Version: 2020-05-28' \
//   -H 'Authorization: Bearer EAAAEIDEW1GanUkgniOrFJJ-Gj8T4CICJ_1Rg80kkdwi89bKmaIJOu9538M6ipk9' \
//   -H 'Content-Type: application/json' \
//   -d '{
//     "given_name": "Huzaifa",
//     "email_address": "ahmadhuzaifa012@gmail.com",
//     "family_name": "Ahmad",
//     "note": "217 Barley Ct",
//     "phone_number": "9165794133",
//     "reference_id": "iodionsaionodinoiinsaoinodsainoinod"
//   }'


