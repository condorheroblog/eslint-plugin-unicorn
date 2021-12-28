import {getTester} from './utils/test.mjs';

const {test} = getTester(import.meta);

test.snapshot({
	valid: [
		// `object`
		'const then = {}',
		'const notThen = then',
		'const then = then.then',
		'const foo = {notThen: 1}',
		'const foo = {notThen() {}}',
		'const foo = {[then]: 1}',
		'const NOT_THEN = "no-then";const foo = {[NOT_THEN]: 1}',
		'function foo({then}) {}',

		// `class`
		'class then {}',
		'class Foo {notThen}',
		'class Foo {notThen() {}}',
		'class Foo {[then]}',
		'class Foo {#then}',
		'class Foo {#then() {}}',
		'class Foo {[then]() {}}',
		'class Foo {get notThen() {}}',
		'class Foo {get #then() {}}',
		'class Foo {get [then]() {}}',
		'class Foo {static notThen}',
		'class Foo {static notThen() {}}',
		'class Foo {static #then}',
		'class Foo {static #then() {}}',
		'class Foo {static [then]}',
		'class Foo {static [then]() {}}',
		'class Foo {static get notThen() {}}',
		'class Foo {static get #then() {}}',
		'class Foo {static get [then]() {}}',
		'class Foo {notThen = then}',

		// Assign
		'foo[then] = 1',
		'foo.notThen = 1',
		'then.notThen = then.then',
		'const NOT_THEN = "no-then";foo[NOT_THEN] = 1',
		'foo.then ++',
		'++ foo.then',
		'delete foo.then',
		'typeof foo.then',
		'foo.then != 1',

		// `Object.fromEntries`
		'Object.fromEntries([then, 1])',
		'Object.fromEntries(["notThen", "then"])',
		'const NOT_THEN = "not-then";Object.fromEntries([NOT_THEN, 1])',

		// `{Object,Reflect}.defineProperty`
		'Object.defineProperty(foo, then, 1)',
		'Object.defineProperty(foo, "not-then", 1)',
		'const then = "no-then";Object.defineProperty(foo, then, 1)',
		'Reflect.defineProperty(foo, then, 1)',
		'Reflect.defineProperty(foo, "not-then", 1)',
		'const then = "no-then";Reflect.defineProperty(foo, then, 1)',
		'Object.defineProperty(foo, "then", )',
		'Object.defineProperty(...foo, "then", 1)',
		'Object.defineProperty(foo, ...["then", 1])',

		// `export`
		'export {default} from "then"',
		'const then = 1; export {then as notThen}',
		'export default then',
		'export function notThen(){}',
		'export class notThen {}',
		'export default function then (){}',
		'export default class then {}',
		'export default function (){}',
		'export default class {}',

		// `export variables`
		'export const notThen = 1',
		'export const {then: notThen} = 1',
		'export const {then: notThen = then} = 1',
	],
	invalid: [
		// `object`
		'const foo = {then: 1}',
		'const foo = {["then"]: 1}',
		'const foo = {[`then`]: 1}',
		'const THEN = "then";const foo = {[THEN]: 1}',
		'const foo = {then() {}}',
		'const foo = {["then"]() {}}',
		'const foo = {[`then`]() {}}',
		'const THEN = "then";const foo = {[THEN]() {}}',
		'const foo = {get then() {}}',
		'const foo = {get ["then"]() {}}',
		'const foo = {get [`then`]() {}}',
		'const THEN = "then";const foo = {get [THEN]() {}}',

		// `class`
		'class Foo {then}',
		'const Foo = class {then}',
		'class Foo {["then"]}',
		'class Foo {[`then`]}',
		'const THEN = "then";class Foo {[THEN]}',
		'class Foo {then() {}}',
		'class Foo {["then"]() {}}',
		'class Foo {[`then`]() {}}',
		'const THEN = "then";class Foo {[THEN]() {}}',
		'class Foo {static then}',
		'class Foo {static ["then"]}',
		'class Foo {static [`then`]}',
		'const THEN = "then";class Foo {static [THEN]}',
		'class Foo {static then() {}}',
		'class Foo {static ["then"]() {}}',
		'class Foo {static [`then`]() {}}',
		'const THEN = "then";class Foo {static [THEN]() {}}',
		'class Foo {get then() {}}',
		'class Foo {get ["then"]() {}}',
		'class Foo {get [`then`]() {}}',
		'const THEN = "then";class Foo {get [THEN]() {}}',
		'class Foo {set then(v) {}}',
		'class Foo {set ["then"](v) {}}',
		'class Foo {set [`then`](v) {}}',
		'const THEN = "then";class Foo {set [THEN](v) {}}',
		'class Foo {static get then() {}}',
		'class Foo {static get ["then"]() {}}',
		'class Foo {static get [`then`]() {}}',
		'const THEN = "then";class Foo {static get [THEN]() {}}',

		// Assign
		'foo.then = 1',
		'foo["then"] = 1',
		'foo[`then`] = 1',
		'const THEN = "then";foo[THEN] = 1',
		'foo.then += 1',
		'foo.then ||= 1',
		'foo.then ??= 1',

		// `{Object,Reflect}.defineProperty`
		'Object.defineProperty(foo, "then", 1)',
		'Object.defineProperty(foo, `then`, 1)',
		'const THEN = "then";Object.defineProperty(foo, THEN, 1)',
		'Reflect.defineProperty(foo, "then", 1)',
		'Reflect.defineProperty(foo, `then`, 1)',
		'const THEN = "then";Reflect.defineProperty(foo, THEN, 1)',

		// `Object.fromEntries`
		'Object.fromEntries(["then", 1])',
		'Object.fromEntries([`then`, 1])',
		'const THEN = "then";Object.fromEntries([THEN, 1])',

		// `export`
		'const then = 1; export {then}',
		'const notThen = 1; export {notThen as then}',
		'export {then} from "foo"',
		'export function then() {}',
		'export async function then() {}',
		'export function * then() {}',
		'export async function * then() {}',
		'export class then {}',

		// `export variables`
		'export const then = 1',
		'export let then = 1',
		'export var then = 1',
		'export const [then] = 1',
		'export let [then] = 1',
		'export var [then] = 1',
		'export const [, then] = 1',
		'export let [, then] = 1',
		'export var [, then] = 1',
		'export const [, ...then] = 1',
		'export let [, ...then] = 1',
		'export var [, ...then] = 1',
		'export const {then} = 1',
		'export let {then} = 1',
		'export var {then} = 1',
		'export const {foo, ...then} = 1',
		'export let {foo, ...then} = 1',
		'export var {foo, ...then} = 1',
		'export const {foo: {bar: [{baz: then}]}} = 1',
	],
});