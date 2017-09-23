// @flow
/* eslint no-console: 0*/

// import Button from "spectre-ui/Button";
import { encode, decode, test } from "node-mock-server-uuid";

const uuid: string = encode("/app/v1/products/:productId");

console.log(test.name);
console.log(uuid);
console.log(decode(uuid));
// console.log(<Button modifier="test" />);
