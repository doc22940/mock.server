// @flow
/* eslint no-console: 0*/

import { encode, decode } from "node-mock-server-uuid";

const uuid: string = encode("/app/v1/products/:productId");

console.log(uuid);
console.log(decode(uuid));
// console.log(<Button modifier="test" />);
