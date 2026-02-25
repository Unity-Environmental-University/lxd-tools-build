/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ueu/ueu-canvas/dist/Account.js"
/*!******************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/Account.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAccountIdFromUrl = exports.RootAccountNotFoundError = exports.Account = void 0;
const baseCanvasObject_1 = __webpack_require__(/*! ./baseCanvasObject */ "./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ./fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const fetchJson_1 = __webpack_require__(/*! ./fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
/**
 *  A base class for objects that interact with the Canvas API
 */
class Account extends baseCanvasObject_1.BaseCanvasObject {
    static nameProperty = 'name'; // The field name of the primary name of the canvas object type
    static contentUrlTemplate = '/api/v1/accounts/{content_id}'; // A templated url to get a single item
    static allContentUrlTemplate = '/api/v1/accounts'; // A templated url to get all items
    static account;
    static async getFromUrl(url = null) {
        if (url === null) {
            url = document.documentURI;
        }
        const match = /accounts\/(\d+)/.exec(url);
        if (match) {
            console.log(match);
            return await this.getAccountById(parseInt(match[1]));
        }
        return null;
    }
    static async getAccountById(accountId, config = undefined) {
        const data = await (0, fetchJson_1.fetchJson)(`/api/v1/accounts/${accountId}`, config);
        return new Account(data);
    }
    static async getRootAccount(resetCache = false) {
        if (!resetCache && this.hasOwnProperty('account') && this.account) {
            return this.account;
        }
        const accountGen = (0, getPagedDataGenerator_1.getPagedDataGenerator)('/api/v1/accounts');
        for await (const account of accountGen) {
            if (account.root_account_id)
                continue; //if there is a root_account_id, this is not the root account
            const root = new Account(account);
            this.account = root;
            return root;
        }
    }
    get rootAccountId() {
        return this.canvasData['root_account_id'];
    }
}
exports.Account = Account;
class RootAccountNotFoundError extends Error {
    name = 'RootAccountNotFoundError';
}
exports.RootAccountNotFoundError = RootAccountNotFoundError;
const getAccountIdFromUrl = (url = null) => {
    if (url === null) {
        url = document.documentURI;
    }
    const match = /accounts\/(\d+)/.exec(url);
    return match ? parseInt(match[1]) : null;
};
exports.getAccountIdFromUrl = getAccountIdFromUrl;
//# sourceMappingURL=Account.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/NotImplementedException.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/NotImplementedException.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotImplementedException = void 0;
class NotImplementedException extends Error {
    name = "NotImplementedException";
}
exports.NotImplementedException = NotImplementedException;
//# sourceMappingURL=NotImplementedException.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js"
/*!***************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseCanvasObject = void 0;
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const canvasUtils_1 = __webpack_require__(/*! ./canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ./fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const utils_1 = __webpack_require__(/*! ./fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
const fetchJson_1 = __webpack_require__(/*! ./fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
/**
 * DEPRECATED
 */
class BaseCanvasObject {
    static idProperty = 'id'; // The field name of the id of the canvas object type
    static nameProperty = 'name'; // The field name of the primary name of the canvas object type
    static contentUrlTemplate = null; // A templated url to get a single item
    static allContentUrlTemplate = null; // A templated url to get all items
    canvasData;
    _accountId = null;
    get accountId() {
        return this._accountId;
    }
    constructor(data) {
        this.canvasData = data || {}; // A dict holding the decoded json representation of the object in Canvas
    }
    getClass() {
        return this.constructor;
    }
    getItem(item) {
        return this.canvasData[item];
    }
    get myClass() {
        return this.constructor;
    }
    get nameKey() {
        (0, assert_1.default)(this.myClass.nameProperty);
        return this.myClass.nameProperty;
    }
    get rawData() {
        return { ...this.canvasData };
    }
    get contentUrlPath() {
        const constructor = this.constructor;
        (0, assert_1.default)(typeof this.accountId === 'number');
        (0, assert_1.default)(typeof constructor.contentUrlTemplate === 'string');
        return '/api/v1/' + constructor.contentUrlTemplate
            .replace('{content_id}', this.id.toString())
            .replace('{account_id}', this.accountId.toString());
    }
    get htmlContentUrl() {
        return `${this.contentUrlPath}`;
    }
    get data() {
        return this.canvasData;
    }
    static async getDataById(contentId, courseId = null, config = null) {
        const url = this.getUrlPathFromIds(contentId, courseId);
        const response = await (0, fetchJson_1.fetchJson)(url, config);
        (0, assert_1.default)(!Array.isArray(response));
        return response;
    }
    static getUrlPathFromIds(contentId, courseId) {
        (0, assert_1.default)(typeof this.contentUrlTemplate === 'string');
        let url = this.contentUrlTemplate
            .replace('{content_id}', contentId.toString());
        if (courseId)
            url = url.replace('{course_id}', courseId.toString());
        return url;
    }
    /**
     * @param courseId - The course ID to get elements within, if applicable
     * @param accountId - The account ID to get elements within, if applicable
     */
    static getAllUrl(courseId = null, accountId = null) {
        (0, assert_1.default)(typeof this.allContentUrlTemplate === 'string');
        let replaced = this.allContentUrlTemplate;
        if (courseId)
            replaced = replaced.replace('{course_id}', courseId.toString());
        if (accountId)
            replaced = replaced.replace('{account_id}', accountId.toString());
        return replaced;
    }
    static async getAll(config = null) {
        const url = this.getAllUrl();
        return await (0, canvasUtils_1.renderAsyncGen)((0, getPagedDataGenerator_1.getPagedDataGenerator)(this.getAllUrl(), config));
    }
    get id() {
        const id = this.canvasData[this.constructor.idProperty];
        return parseInt(id);
    }
    get name() {
        const nameProperty = this.getClass().nameProperty;
        if (!nameProperty)
            return 'NAME PROPERTY NOT SET';
        return this.getItem(nameProperty);
    }
    async saveData(data, config) {
        (0, assert_1.default)(this.contentUrlPath);
        config = (0, utils_1.overrideConfig)({
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)(data)
            }
        }, config);
        let results = await (0, fetchJson_1.fetchJson)(this.contentUrlPath, config);
        if (Array.isArray(results))
            results = results[0];
        this.canvasData = { ...this.canvasData, ...results };
        return this.canvasData;
    }
}
exports.BaseCanvasObject = BaseCanvasObject;
//# sourceMappingURL=baseCanvasObject.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js"
/*!**********************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callAll = callAll;
exports.parentElement = parentElement;
exports.formDataify = formDataify;
exports.deepObjectCopy = deepObjectCopy;
exports.deepObjectMerge = deepObjectMerge;
exports.deFormDataify = deFormDataify;
exports.queryStringify = queryStringify;
exports.getItemTypeAndId = getItemTypeAndId;
exports.searchParamsFromObject = searchParamsFromObject;
exports.courseNameSort = courseNameSort;
exports.range = range;
exports.numbers = numbers;
exports.getPlainTextFromHtml = getPlainTextFromHtml;
exports.batchify = batchify;
exports.filterUniqueFunc = filterUniqueFunc;
exports.batchGen = batchGen;
exports.renderAsyncGen = renderAsyncGen;
exports.generatorMap = generatorMap;
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const fetchJson_1 = __webpack_require__(/*! ./fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
function isWithParamsFunc(func) {
    return typeof func === 'function' && func.length > 0;
}
function isWithoutParamsFunc(func) {
    return typeof func === 'function' && func.length === 0;
}
function callAll(funcs, params) {
    const output = [];
    for (const func of funcs) {
        if ((typeof func === 'object')) {
            output.push(func.func(func.params));
            continue;
        }
        if (isWithoutParamsFunc(func)) {
            output.push(func());
            continue;
        }
        if (isWithParamsFunc(func) && typeof params !== 'undefined') {
            output.push(func(params));
        }
    }
    return output;
}
/**
 * Traverses up the DOM and finds a parent with a matching Tag
 * @param el
 * @param tagName
 */
function parentElement(el, tagName) {
    if (!el)
        return null;
    while (el && el.parentElement) {
        el = el.parentElement;
        if (el.tagName && el.tagName.toLowerCase() == tagName) {
            return el;
        }
    }
    return null;
}
const type_lut = {
    Assignment: 'assignment',
    Discussion: 'discussion_topic',
    Quiz: 'quiz',
    ExternalTool: 'external_tool',
    File: 'attachment',
    Page: 'wiki_page',
    ExternalUrl: null, //Not passable to restrict
    Subheader: null, //Not passable to restrict
};
function formDataify(data) {
    const formData = new FormData();
    for (const key in data) {
        addToFormData(formData, key, data[key]);
    }
    if (document) {
        const el = document.querySelector("input[name='authenticity_token']");
        const authenticityToken = el ? el.value : null;
        const cookies = getCookies();
        let csrfToken = cookies['_csrf_token'];
        if (authenticityToken)
            formData.append('authenticity_token', authenticityToken);
        else if (csrfToken) {
            csrfToken = csrfToken.replaceAll(/%([0-9A-F]{2})/g, (substring, hex) => {
                const hexCode = hex;
                return String.fromCharCode(parseInt(hexCode, 16));
            });
            console.log(csrfToken);
            formData.append('authenticity_token', csrfToken);
        }
    }
    return formData;
}
function deepObjectCopy(toCopy, complexObjectsTracker = []) {
    return deepObjectMerge(toCopy, {}, true, complexObjectsTracker);
}
function deepObjectMerge(a, b, overrideWithA = false, complexObjectsTracker = []) {
    for (const value of [a, b]) {
        if (typeof value == "object" &&
            complexObjectsTracker.includes(value))
            throw new Error(`Infinite Loop: Element ${value} contains itself`);
    }
    //if the types don't match
    if (a && b && (typeof a !== typeof b ||
        Array.isArray(a) != Array.isArray(b))) {
        if (a === b)
            return a;
        if (overrideWithA)
            return a;
        throw new Error(`Type clash on merge ${typeof a} ${a}, ${typeof b} ${b}`);
    }
    //If either or both are arrays, merge if able to
    if (Array.isArray(a)) {
        if (!b)
            return deepObjectCopy(a, complexObjectsTracker);
        (0, assert_1.default)(Array.isArray(b), "We should not get here if b is not an array");
        const mergedArray = [...a, ...b];
        const outputArray = mergedArray.map(value => {
            if (!value)
                return value;
            if (typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
                //Make a deep of any object literal
                if (!value)
                    return value;
                value = deepObjectCopy(value, [...complexObjectsTracker, a, b]);
            }
            return value;
        });
        return outputArray;
    }
    if (Array.isArray(b))
        return deepObjectCopy(b, complexObjectsTracker); //we already know A is not an array at this point, return a deep copy of b
    if ((a && typeof a === 'object') || (b && typeof b === 'object')) {
        if (a instanceof File && b instanceof File) {
            if (!overrideWithA)
                (0, assert_1.default)(a.size == b.size && a.name == b.name, `File value clash ${a.name} ${b.name}`);
            return a;
        }
        if (a && Object.getPrototypeOf(a) != Object.prototype
            || b && Object.getPrototypeOf(b) != Object.prototype) {
            if (!overrideWithA)
                (0, assert_1.default)(!a || !b || a === b, `Non-mergeable object clash ${a} ${b}`);
            if (a)
                return a;
            if (b)
                return b;
        }
        if (a && !b)
            return deepObjectCopy(a, complexObjectsTracker);
        if (b && !a)
            return deepObjectCopy(b, complexObjectsTracker);
        (0, assert_1.default)(a && typeof a === 'object' && Object.getPrototypeOf(a) === Object.prototype, "a should always be defined here.");
        (0, assert_1.default)(b && typeof b === 'object' && Object.getPrototypeOf(b) === Object.prototype, "b should always be defined here.");
        const allKeys = [...Object.keys(a), ...Object.keys(b)].filter(filterUniqueFunc);
        const aRecord = a;
        const bRecord = b;
        const entries = allKeys.map((key) => [
            key,
            deepObjectMerge(aRecord[key], bRecord[key], overrideWithA, [...complexObjectsTracker, a, b])
        ]);
        return Object.fromEntries(entries);
    }
    if (a && b) {
        if (overrideWithA || a === b)
            return a;
        throw new Error(`Values unmergeable, ${a}>:${typeof a}, ${b} ${typeof b}`);
    }
    if (a)
        return a;
    if (b)
        return b;
    if (a === null)
        return a;
    if (b === null)
        return b;
    (0, assert_1.default)(typeof a === 'undefined');
    return a;
}
function deFormDataify(formData) {
    return [...formData.entries()].reduce((aggregator, [key, value]) => {
        const isArray = key.includes('[]');
        const keys = key.split('[').map(key => key.replaceAll(/[\[\]]/g, ''));
        if (isArray)
            keys.pop(); //remove the last, empty, key if it's an array
        let currentValue = isArray ? [value] : value;
        while (keys.length > 0) {
            let newValue;
            newValue = {
                [keys.pop()]: currentValue
            };
            currentValue = newValue;
        }
        return deepObjectMerge(aggregator, currentValue) || { ...aggregator };
    }, {});
}
function getCookies() {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const out = {};
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        out[key] = value;
    }
    return out;
}
/**
 * Adds arrays and objects in the form formData posts expects
 * @param formData
 * @param key
 * @param value
 */
function addToFormData(formData, key, value) {
    if (Array.isArray(value)) {
        for (const item of value) {
            addToFormData(formData, `${key}[]`, item);
        }
    }
    else if (typeof value === 'object') {
        for (const itemKey in value) {
            const itemValue = value[itemKey];
            addToFormData(formData, key.length > 0 ? `${key}[${itemKey}]` : itemKey, itemValue);
        }
    }
    else {
        formData.append(key, value);
    }
}
function queryStringify(data) {
    const searchParams = new URLSearchParams();
    for (const key in data) {
        addToQuery(searchParams, key, data[key]);
    }
    return searchParams;
}
function addToQuery(searchParams, key, value) {
    if (Array.isArray(value)) {
        for (const item of value) {
            addToQuery(searchParams, `${key}[]`, item);
        }
    }
    else if (typeof value === 'object') {
        for (const itemKey in value) {
            const itemValue = value[itemKey];
            addToQuery(searchParams, key.length > 0 ? `${key}[${itemKey}]` : itemKey, itemValue);
        }
    }
    else {
        searchParams.append(key, value);
    }
}
/**
 * Takes in a module item and returns an object specifying its type and content id
 * @param item
 */
async function getItemTypeAndId(item) {
    let id;
    let type;
    (0, assert_1.default)(type_lut.hasOwnProperty(item.type), "Unexpected type " + item.type);
    type = type_lut[item.type];
    if (type === "wiki_page") {
        (0, assert_1.default)(item.url); //wiki_page items always have a url param
        const pageData = await (0, fetchJson_1.fetchJson)(item.url);
        id = pageData.page_id;
    }
    else {
        id = item.content_id;
    }
    return { type, id };
}
/**
 * @param queryParams
 * @returns {URLSearchParams} The correctly formatted parameters
 */
function searchParamsFromObject(queryParams) {
    return queryStringify(queryParams);
}
/**
 * sort courses (or course Data) alphabetically by name
 * @param a item to compare.
 * @param b item to compare.
 */
function courseNameSort(a, b) {
    if (a.name < b.name)
        return -1;
    if (b.name < a.name)
        return 1;
    return 0;
}
function* range(start, end, step = 1) {
    if (typeof end === 'undefined') {
        let i = start;
        while (true) {
            yield i;
            i += step;
        }
    }
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
function* numbers(start, step = 1) {
    let i = 0;
    while (true) {
        yield i;
        i += step;
    }
}
function getPlainTextFromHtml(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.innerText || el.textContent || "";
}
function batchify(toBatch, batchSize) {
    const out = [];
    for (let i = 0; i < toBatch.length; i += batchSize) {
        out.push(toBatch.slice(i, i + batchSize));
    }
    return out;
}
function filterUniqueFunc(item, index, array) {
    return array.indexOf(item) === index;
}
async function* batchGen(generator, batchSize) {
    if (batchSize <= 0)
        throw new Error("Batch size cannot be 0 or lower");
    while (true) {
        const out = [];
        for (let i = 0; i < batchSize; i++) {
            const next = await generator.next();
            if (next.done) {
                if (out.length > 0)
                    yield out;
                return;
            }
            out.push(next.value);
        }
        yield out;
    }
}
async function renderAsyncGen(generator) {
    const out = [];
    for await (const item of generator) {
        out.push(item);
    }
    return out;
}
async function* generatorMap(generator, nextMapFunc) {
    let i = 0;
    for await (const value of generator) {
        yield nextMapFunc(value, i, generator);
        i++;
    }
}
//# sourceMappingURL=canvasUtils.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseContentItem = void 0;
exports.getBannerImage = getBannerImage;
exports.putContentConfig = putContentConfig;
exports.postContentConfig = postContentConfig;
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const baseCanvasObject_1 = __webpack_require__(/*! ../baseCanvasObject */ "./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js");
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
//import {getResizedBlob} from "@/image";
const getCourseIdFromUrl_1 = __importDefault(__webpack_require__(/*! ../course/getCourseIdFromUrl */ "./node_modules/@ueu/ueu-canvas/dist/course/getCourseIdFromUrl.js"));
const NotImplementedException_1 = __webpack_require__(/*! ../NotImplementedException */ "./node_modules/@ueu/ueu-canvas/dist/NotImplementedException.js");
class BaseContentItem extends baseCanvasObject_1.BaseCanvasObject {
    static bodyProperty;
    static nameProperty = 'name';
    kind = undefined;
    _courseId;
    constructor(canvasData, courseId) {
        super(canvasData);
        this._courseId = courseId;
    }
    get htmlContentUrl() {
        return `${this.contentUrlPath}`.replace('/api/v1/', '/');
    }
    static get contentUrlPart() {
        (0, assert_1.default)(this.allContentUrlTemplate, "Not a content url template");
        const urlTermMatch = /\/([\w_]+)$/.exec(this.allContentUrlTemplate);
        if (!urlTermMatch)
            return null;
        return urlTermMatch[1];
    }
    static async getAllInCourse(courseId, config = null) {
        const url = this.getAllUrl(courseId);
        const data = await (0, getPagedDataGenerator_1.getPagedData)(url, config);
        return data.map(item => new this(item, courseId));
    }
    static clearAddedContentTags(text) {
        if (!text)
            return null;
        let out = text.replace(/<\/?link[^>]*>/g, '');
        out = out.replace(/<\/?script[^>]*>/g, '');
        return out;
    }
    static async getFromUrl(url = null, courseId = null) {
        if (url === null) {
            url = document.documentURI;
        }
        url = url.replace(/\.com/, '.com/api/v1');
        const data = await (0, fetchJson_1.fetchJson)(url);
        if (!courseId) {
            courseId = (0, getCourseIdFromUrl_1.default)(url);
            if (!courseId)
                return null;
        }
        //If this is a collection of data, we can't process it as a Canvas Object
        if (Array.isArray(data))
            return null;
        (0, assert_1.default)(!Array.isArray(data));
        if (data) {
            return new this(data, courseId);
        }
        return null;
    }
    static async getById(contentId, courseId) {
        return new this(await this.getDataById(contentId, courseId), courseId);
    }
    get bodyKey() {
        return this.myClass.bodyProperty;
    }
    get body() {
        if (!this.bodyKey)
            return null;
        return this.myClass.clearAddedContentTags(this.canvasData[this.bodyKey]);
    }
    get dueAt() {
        if (!this.canvasData.hasOwnProperty('due_at')) {
            return null;
        }
        if (!this.canvasData.due_at)
            return null;
        return new Date(this.canvasData.due_at);
    }
    async setDueAt(date) {
        throw new NotImplementedException_1.NotImplementedException();
    }
    async dueAtTimeDelta(timeDelta) {
        if (!this.dueAt)
            return null;
        const result = new Date(this.dueAt);
        result.setDate(result.getDate() + timeDelta);
        return await this.setDueAt(result);
    }
    get contentUrlPath() {
        let url = this.constructor.contentUrlTemplate;
        (0, assert_1.default)(url);
        url = url.replace('{course_id}', this.courseId.toString());
        url = url.replace('{content_id}', this.id.toString());
        return url;
    }
    get courseId() {
        return this._courseId;
    }
    async updateContent(text, name, config) {
        const data = {};
        const constructor = this.constructor;
        (0, assert_1.default)(constructor.bodyProperty);
        (0, assert_1.default)(constructor.nameProperty);
        const nameProp = constructor.nameProperty;
        const bodyProp = constructor.bodyProperty;
        if (text && bodyProp) {
            this.canvasData[bodyProp] = text;
            data[bodyProp] = text;
        }
        if (name && nameProp) {
            this.canvasData[nameProp] = name;
            data[nameProp] = name;
        }
        return this.saveData(data, config);
    }
    async getMeInAnotherCourse(targetCourseId) {
        const ContentClass = this.constructor;
        const targets = await ContentClass.getAllInCourse(targetCourseId, { queryParams: { search_term: this.name } });
        return targets.find((target) => target.name == this.name);
    }
    getAllLinks() {
        const el = this.bodyAsElement;
        const anchors = el.querySelectorAll('a');
        const urls = [];
        for (const link of anchors)
            urls.push(link.href);
        return urls;
    }
    get bodyAsElement() {
        (0, assert_1.default)(this.body, "This content item has no body property");
        const el = document.createElement('div');
        el.innerHTML = this.body;
        return el;
    }
}
exports.BaseContentItem = BaseContentItem;
async function getFileDataFromUrl(url, courseId) {
    const match = /.*\/files\/(\d+)/.exec(url);
    if (!match)
        return null;
    if (match) {
        const fileId = parseInt(match[1]);
        return await getFileData(fileId, courseId);
    }
}
function getBannerImage(overviewPage) {
    const pageBody = document.createElement('html');
    if (!overviewPage.body)
        throw new Error(`Content item ${overviewPage.name} has no html body`);
    pageBody.innerHTML = overviewPage.body;
    return pageBody.querySelector('.cbt-banner-image img');
}
async function getFileData(fileId, courseId) {
    const url = `/api/v1/courses/${courseId}/files/${fileId}`;
    return await (0, fetchJson_1.fetchJson)(url);
}
function putContentConfig(data, config) {
    return (0, canvasUtils_1.deepObjectMerge)(config, {
        fetchInit: {
            method: 'PUT',
            body: (0, canvasUtils_1.formDataify)(data)
        }
    }, true);
}
function postContentConfig(data, config) {
    return (0, canvasUtils_1.deepObjectMerge)(config, {
        fetchInit: {
            method: 'POST',
            body: (0, canvasUtils_1.formDataify)(data)
        }
    }, true);
}
//# sourceMappingURL=BaseContentItem.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js"
/*!******************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentUrlFuncs = contentUrlFuncs;
exports.courseContentUrlFunc = courseContentUrlFunc;
exports.putContentFunc = putContentFunc;
exports.postContentFunc = postContentFunc;
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const BaseContentItem_1 = __webpack_require__(/*! ../content/BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js");
function contentUrlFuncs(contentUrlPart) {
    const urlRegex = new RegExp(`courses\/(\\d+)\/${contentUrlPart}/(\\d+)`, 'i');
    const getApiUrl = courseContentUrlFunc(`/api/v1/courses/{courseId}/${contentUrlPart}/{contentId}`);
    const getAllApiUrl = (courseId) => `/api/v1/courses/${courseId}/${contentUrlPart}`;
    const getHtmlUrl = courseContentUrlFunc(`/courses/{courseId}/${contentUrlPart}/{contentId}`);
    function getCourseAndContentIdFromUrl(url) {
        const [full, courseId, contentId] = url.match(urlRegex) ?? [undefined, undefined, undefined];
        return [courseId, contentId].map(a => a ? parseInt(a) : undefined);
    }
    const isValidUrl = (url) => typeof url === 'string' && typeof getCourseAndContentIdFromUrl(url)[0] !== 'undefined';
    return {
        contentUrlPart,
        getApiUrl,
        getAllApiUrl,
        getHtmlUrl,
        getCourseAndContentIdFromUrl,
        isValidUrl,
    };
}
function courseContentUrlFunc(url) {
    return (courseId, contentId) => url
        .replaceAll('{courseId}', courseId.toString())
        .replaceAll('{contentId}', contentId.toString());
}
function putContentFunc(getApiUrl) {
    return async function (courseId, contentId, content, config) {
        const url = getApiUrl(courseId, contentId);
        return await (0, fetchJson_1.fetchJson)(url, (0, BaseContentItem_1.putContentConfig)(content, config));
    };
}
function postContentFunc(getApiUrl) {
    return async function (courseId, content, config) {
        const url = getApiUrl(courseId);
        return await (0, fetchJson_1.fetchJson)(url, (0, BaseContentItem_1.postContentConfig)(content, config));
    };
}
//# sourceMappingURL=ContentKind.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Assignment = void 0;
const BaseContentItem_1 = __webpack_require__(/*! ../../content/BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js");
const temporal_polyfill_1 = __webpack_require__(/*! temporal-polyfill */ "./node_modules/temporal-polyfill/index.cjs");
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const AssignmentKind_1 = __importDefault(__webpack_require__(/*! ../../content/assignments/AssignmentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/AssignmentKind.js"));
class Assignment extends BaseContentItem_1.BaseContentItem {
    static kind = AssignmentKind_1.default;
    static nameProperty = 'name';
    static bodyProperty = 'description';
    static contentUrlTemplate = "/api/v1/courses/{course_id}/assignments/{content_id}";
    static allContentUrlTemplate = "/api/v1/courses/{course_id}/assignments";
    constructor(assignmentData, courseId) {
        super(assignmentData, courseId);
    }
    async setDueAt(dueAt, config) {
        const sourceDueAt = this.rawData.due_at ? temporal_polyfill_1.Temporal.Instant.from(this.rawData.due_at) : null;
        const targetDueAt = temporal_polyfill_1.Temporal.Instant.from(dueAt.toISOString());
        const payload = {
            assignment: {
                due_at: dueAt.toISOString(),
            }
        };
        if (this.rawData.peer_reviews && 'automatic_peer_reviews' in this.rawData) {
            const peerReviewTime = this.rawData.peer_reviews_assign_at ? temporal_polyfill_1.Temporal.Instant.from(this.rawData.peer_reviews_assign_at) : null;
            (0, assert_1.default)(sourceDueAt, "Trying to set peer review date without a due date for the assignment.");
            if (peerReviewTime) {
                const peerReviewOffset = sourceDueAt.until(peerReviewTime);
                const newPeerReviewTime = targetDueAt.add(peerReviewOffset);
                payload.assignment.peer_reviews_assign_at =
                    new Date(newPeerReviewTime.epochMilliseconds).toISOString();
            }
        }
        const data = await this.saveData(payload, config);
        this.canvasData['due_at'] = dueAt.toISOString();
        return data;
    }
    get rawData() {
        return this.canvasData;
    }
    async updateContent(text, name, config) {
        const assignmentData = {};
        if (text) {
            assignmentData.description = text;
            this.rawData.description = text;
        }
        if (name) {
            assignmentData.name = name;
            this.rawData.name = name;
        }
        return await this.saveData({
            assignment: assignmentData
        }, config);
    }
}
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/AssignmentKind.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/assignments/AssignmentKind.js ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignmentKind = exports.assignmentUrlFuncs = void 0;
const fetchJson_1 = __webpack_require__(/*! ../../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const ContentKind_1 = __webpack_require__(/*! ../../content/ContentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js");
exports.assignmentUrlFuncs = (0, ContentKind_1.contentUrlFuncs)('assignments');
exports.AssignmentKind = {
    getId: (data) => data.id,
    dataIsThisKind: (data) => {
        return 'submission_types' in data;
    },
    getName: (data) => data.name,
    getBody: (data) => data.description,
    async get(courseId, contentId, config) {
        const data = await (0, fetchJson_1.fetchJson)(exports.assignmentUrlFuncs.getApiUrl(courseId, contentId), config);
        return data;
    },
    ...exports.assignmentUrlFuncs,
    dataGenerator: (courseId, config) => (0, getPagedDataGenerator_1.getPagedDataGenerator)(exports.assignmentUrlFuncs.getAllApiUrl(courseId), config),
    put: (0, ContentKind_1.putContentFunc)(exports.assignmentUrlFuncs.getApiUrl),
};
exports["default"] = exports.AssignmentKind;
//# sourceMappingURL=AssignmentKind.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/index.js"
/*!************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/assignments/index.js ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateAssignmentData = exports.assignmentDataGen = void 0;
exports.updateAssignmentDueDates = updateAssignmentDueDates;
const AssignmentKind_1 = __importDefault(__webpack_require__(/*! ../../content/assignments/AssignmentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/AssignmentKind.js"));
const Assignment_1 = __webpack_require__(/*! ../../content/assignments/Assignment */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js");
exports.assignmentDataGen = AssignmentKind_1.default.dataGenerator;
exports.updateAssignmentData = AssignmentKind_1.default.put;
async function updateAssignmentDueDates(offset, assignments, options) {
    const promises = [];
    const returnAssignments = [];
    let { courseId } = options ?? {};
    if (!courseId && courseId !== 0) {
        courseId = assignments[0].course_id;
    }
    if (offset === 0 || offset) {
        for await (const data of assignments) {
            const assignment = new Assignment_1.Assignment(data, courseId);
            returnAssignments.push(assignment);
            promises.push(assignment.dueAtTimeDelta(Number(offset)));
        }
    }
    return returnAssignments;
}
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/determineContent.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/determineContent.js ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentKinds = exports.CONTENT_KINDS = void 0;
exports.getContentClassFromUrl = getContentClassFromUrl;
exports.getContentItemFromUrl = getContentItemFromUrl;
exports.getContentKindFromUrl = getContentKindFromUrl;
exports.getContentKindFromContent = getContentKindFromContent;
exports.getContentDataFromUrl = getContentDataFromUrl;
const Quiz_1 = __webpack_require__(/*! ../content/quizzes/Quiz */ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/Quiz.js");
const Page_1 = __webpack_require__(/*! ../content/pages/Page */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js");
const Discussion_1 = __webpack_require__(/*! ../content/discussions/Discussion */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/Discussion.js");
const Assignment_1 = __webpack_require__(/*! ../content/assignments/Assignment */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js");
const AssignmentKind_1 = __importDefault(__webpack_require__(/*! ../content/assignments/AssignmentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/AssignmentKind.js"));
const QuizKind_1 = __importDefault(__webpack_require__(/*! ../content/quizzes/QuizKind */ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/QuizKind.js"));
const PageKind_1 = __importDefault(__webpack_require__(/*! ../content/pages/PageKind */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"));
const DiscussionKind_1 = __importDefault(__webpack_require__(/*! ../content/discussions/DiscussionKind */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/DiscussionKind.js"));
exports.CONTENT_KINDS = [
    DiscussionKind_1.default,
    AssignmentKind_1.default,
    PageKind_1.default,
    QuizKind_1.default,
];
exports.ContentKinds = {
    fromUrl: getContentKindFromUrl,
    fromContent: getContentKindFromContent,
    getBody(contentData) {
        const kind = getContentKindFromContent(contentData);
        return (kind?.getBody)(contentData);
    }
};
function getContentClassFromUrl(url = null) {
    if (!url)
        url = document.documentURI;
    for (const class_ of [Assignment_1.Assignment, Quiz_1.Quiz, Page_1.Page, Discussion_1.Discussion]) {
        if (class_.contentUrlPart && url.includes(class_.contentUrlPart))
            return class_;
    }
    return null;
}
async function getContentItemFromUrl(url = null) {
    const ContentClass = getContentClassFromUrl(url);
    if (!ContentClass)
        return null;
    return await ContentClass.getFromUrl(url);
}
function getContentKindFromUrl(url) {
    return exports.CONTENT_KINDS.find(a => a.isValidUrl(url));
}
function getContentKindFromContent(contentData) {
    const result = exports.CONTENT_KINDS.find(a => a.dataIsThisKind(contentData));
    function typeGuard(result) {
        return true;
    }
    if (!typeGuard(result))
        throw new Error("Faulty content type coercion");
    return result;
}
async function getContentDataFromUrl(url, config) {
    const kind = getContentKindFromUrl(url);
    if (!kind)
        return;
    const [courseId, id] = kind.getCourseAndContentIdFromUrl(url);
    if (!courseId || !id)
        return;
    return await kind.get(courseId, id, config);
}
//# sourceMappingURL=determineContent.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/Discussion.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/discussions/Discussion.js ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Discussion = void 0;
const BaseContentItem_1 = __webpack_require__(/*! ../../content/BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js");
const temporal_polyfill_1 = __webpack_require__(/*! temporal-polyfill */ "./node_modules/temporal-polyfill/index.cjs");
const DiscussionKind_1 = __importDefault(__webpack_require__(/*! ../../content/discussions/DiscussionKind */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/DiscussionKind.js"));
class Discussion extends BaseContentItem_1.BaseContentItem {
    static kindInfo = DiscussionKind_1.default;
    static nameProperty = 'title';
    static bodyProperty = 'message';
    static contentUrlTemplate = "/api/v1/courses/{course_id}/discussion_topics/{content_id}";
    static allContentUrlTemplate = "/api/v1/courses/{course_id}/discussion_topics";
    async offsetPublishDelay(days, config) {
        const data = this.rawData;
        if (!this.rawData.delayed_post_at)
            return;
        let delayedPostAt = temporal_polyfill_1.Temporal.Instant.from(this.rawData.delayed_post_at).toZonedDateTimeISO('UTC');
        delayedPostAt = delayedPostAt.add({ days });
        const payload = {
            delayed_post_at: new Date(delayedPostAt.epochMilliseconds).toISOString()
        };
        await this.saveData(payload, config);
    }
    get rawData() {
        return this.canvasData;
    }
}
exports.Discussion = Discussion;
//# sourceMappingURL=Discussion.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/DiscussionKind.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/discussions/DiscussionKind.js ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscussionKind = exports.discussionUrlFuncs = void 0;
const fetchJson_1 = __webpack_require__(/*! ../../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const ContentKind_1 = __webpack_require__(/*! ../../content/ContentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js");
exports.discussionUrlFuncs = (0, ContentKind_1.contentUrlFuncs)('discussion_topics');
exports.DiscussionKind = {
    ...exports.discussionUrlFuncs,
    dataIsThisKind(data) {
        return data.hasOwnProperty('discussion_type');
    },
    getId: (data) => data.id,
    getName: (data) => data.title,
    getBody: (data) => data.message,
    async get(courseId, contentId, config) {
        return await (0, fetchJson_1.fetchJson)(exports.discussionUrlFuncs.getApiUrl(courseId, contentId), config);
    },
    dataGenerator: (courseId, config) => (0, getPagedDataGenerator_1.getPagedDataGenerator)(exports.discussionUrlFuncs.getAllApiUrl(courseId), config),
    put: (0, ContentKind_1.putContentFunc)(exports.discussionUrlFuncs.getApiUrl),
};
exports["default"] = exports.DiscussionKind;
//# sourceMappingURL=DiscussionKind.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/index.js"
/*!************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/discussions/index.js ***!
  \************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Discussion */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/Discussion.js"), exports);
__exportStar(__webpack_require__(/*! ./DiscussionKind */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/DiscussionKind.js"), exports);
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/getContentFuncs.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/getContentFuncs.js ***!
  \**********************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFileLinks = getFileLinks;
exports.getExternalLinks = getExternalLinks;
function getAllLinks(body) {
    const el = bodyAsElement(body);
    const anchors = el.querySelectorAll('a');
    const urls = [];
    for (const link of anchors)
        urls.push(link.href);
    return urls;
}
function bodyAsElement(body) {
    const el = document.createElement('div');
    el.innerHTML = body;
    return el;
}
function getFileLinks(body, courseId) {
    return getAllLinks(body).filter(a => a.match(/instructure\.com.*files\/\d+/i)).map(a => a.split('?')[0]);
}
function getExternalLinks(body, courseId) {
    // Correct regex to exclude unity.instructure.com links properly
    return getAllLinks(body).filter(a => !a.match(/:\/\/unity\.instructure\.com\//i));
}
//# sourceMappingURL=getContentFuncs.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/index.js"
/*!************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/index.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@ueu/ueu-canvas/dist/content/types.js"), exports);
__exportStar(__webpack_require__(/*! ./determineContent */ "./node_modules/@ueu/ueu-canvas/dist/content/determineContent.js"), exports);
__exportStar(__webpack_require__(/*! ./getContentFuncs */ "./node_modules/@ueu/ueu-canvas/dist/content/getContentFuncs.js"), exports);
__exportStar(__webpack_require__(/*! ./ContentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js"), exports);
__exportStar(__webpack_require__(/*! ./openThisContentInTarget */ "./node_modules/@ueu/ueu-canvas/dist/content/openThisContentInTarget.js"), exports);
__exportStar(__webpack_require__(/*! ./pages */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/index.js"), exports);
__exportStar(__webpack_require__(/*! ./quizzes */ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/index.js"), exports);
__exportStar(__webpack_require__(/*! ./discussions */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/index.js"), exports);
__exportStar(__webpack_require__(/*! ./assignments */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/index.js"), exports);
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/openThisContentInTarget.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/openThisContentInTarget.js ***!
  \******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openThisContentInTarget = void 0;
const determineContent_1 = __webpack_require__(/*! ../content/determineContent */ "./node_modules/@ueu/ueu-canvas/dist/content/determineContent.js");
function getIdOrCourse(courseOrId) {
    if (typeof courseOrId === 'object')
        return courseOrId.id;
    return courseOrId;
}
const openThisContentInTarget = async function (currentCourse, target) {
    if (!window)
        return;
    const currentCourseId = getIdOrCourse(currentCourse);
    const targetCourseIds = Array.isArray(target) ? target.map(getIdOrCourse) : [getIdOrCourse(target)];
    const currentContentItem = await (0, determineContent_1.getContentItemFromUrl)(document.documentURI);
    const targetInfos = targetCourseIds.map((targetCourseId) => {
        return {
            courseId: targetCourseId,
            contentItemPromise: currentContentItem?.getMeInAnotherCourse(targetCourseId)
        };
    });
    for (const { courseId, contentItemPromise } of targetInfos) {
        const targetContentItem = await contentItemPromise;
        if (targetContentItem) {
            window.open(targetContentItem.htmlContentUrl);
        }
        else {
            const url = document.URL.replace(currentCourseId.toString(), courseId.toString());
            window.open(url);
        }
    }
};
exports.openThisContentInTarget = openThisContentInTarget;
exports["default"] = exports.openThisContentInTarget;
//# sourceMappingURL=openThisContentInTarget.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Page = void 0;
const BaseContentItem_1 = __webpack_require__(/*! ../../content/BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js");
const PageKind_1 = __importDefault(__webpack_require__(/*! ../../content/pages/PageKind */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"));
class Page extends BaseContentItem_1.BaseContentItem {
    static kindInfo = PageKind_1.default;
    static idProperty = 'page_id';
    static nameProperty = 'title';
    static bodyProperty = 'body';
    static contentUrlTemplate = "/api/v1/courses/{course_id}/pages/{content_id}";
    static allContentUrlTemplate = "/api/v1/courses/{course_id}/pages";
    constructor(canvasData, courseId) {
        super(canvasData, courseId);
    }
    get body() {
        return this.canvasData[this.bodyKey];
    }
    get title() {
        return this.canvasData[this.nameKey];
    }
    async updateContent(text, name, config) {
        const data = {};
        if (text) {
            this.canvasData[this.bodyKey] = text;
            data['wiki_page[body]'] = text;
        }
        if (name) {
            this.canvasData[this.nameKey] = name;
            data[this.nameKey] = name;
        }
        return this.saveData(data, config);
    }
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageKind = exports.PageUrlFuncs = void 0;
const fetchJson_1 = __webpack_require__(/*! ../../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const ContentKind_1 = __webpack_require__(/*! ../../content/ContentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js");
exports.PageUrlFuncs = (0, ContentKind_1.contentUrlFuncs)('pages');
const getStringApiUrl = (0, ContentKind_1.courseContentUrlFunc)(`/api/v1/courses/{courseId}/pages/{contentId}`);
exports.PageKind = {
    ...exports.PageUrlFuncs,
    dataIsThisKind: (data) => {
        return 'page_id' in data;
    },
    getName: page => page.title,
    getBody: page => page.body,
    getId: page => page.page_id,
    get: (id, courseId, config) => (0, fetchJson_1.fetchJson)(exports.PageUrlFuncs.getApiUrl(courseId, id), config),
    getByString: (courseId, contentId, config) => (0, fetchJson_1.fetchJson)(getStringApiUrl(courseId, contentId), config),
    dataGenerator: (courseId, config = { queryParams: { include: ['body'] } }) => (0, getPagedDataGenerator_1.getPagedDataGenerator)(exports.PageUrlFuncs.getAllApiUrl(courseId), config),
    put: (0, ContentKind_1.putContentFunc)(exports.PageUrlFuncs.getApiUrl),
    post: (0, ContentKind_1.postContentFunc)(exports.PageUrlFuncs.getAllApiUrl),
};
exports["default"] = exports.PageKind;
//# sourceMappingURL=PageKind.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/pages/index.js"
/*!******************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/pages/index.js ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const learningMaterialsForModule_1 = __importDefault(__webpack_require__(/*! ./learningMaterialsForModule */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/learningMaterialsForModule.js"));
const Page_1 = __webpack_require__(/*! ./Page */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js");
const PageKind_1 = __importDefault(__webpack_require__(/*! ./PageKind */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"));
const pageTypes = __importStar(__webpack_require__(/*! ./types */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/types.js"));
__exportStar(__webpack_require__(/*! ./learningMaterialsForModule */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/learningMaterialsForModule.js"), exports);
__exportStar(__webpack_require__(/*! ./Page */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js"), exports);
__exportStar(__webpack_require__(/*! ./PageKind */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/types.js"), exports);
exports["default"] = {
    learningMaterialsForModule: learningMaterialsForModule_1.default,
    Page: Page_1.Page,
    PageKind: PageKind_1.default,
    ...pageTypes,
};
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/pages/learningMaterialsForModule.js"
/*!***************************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/pages/learningMaterialsForModule.js ***!
  \***************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.learningMaterialsForModule = learningMaterialsForModule;
const PageKind_1 = __importDefault(__webpack_require__(/*! ../../content/pages/PageKind */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/PageKind.js"));
async function* learningMaterialsForModule(courseId, module) {
    const lmItems = module.items.filter(a => a.title.match(/learning materials/i));
    for await (const item of lmItems) {
        const page = await PageKind_1.default.get(courseId, item.content_id);
        yield { item, page };
    }
}
exports["default"] = learningMaterialsForModule;
//# sourceMappingURL=learningMaterialsForModule.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/pages/types.js"
/*!******************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/pages/types.js ***!
  \******************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/Quiz.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/quizzes/Quiz.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Quiz = void 0;
const BaseContentItem_1 = __webpack_require__(/*! ../../content/BaseContentItem */ "./node_modules/@ueu/ueu-canvas/dist/content/BaseContentItem.js");
const fetchJson_1 = __webpack_require__(/*! ../../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const canvasUtils_1 = __webpack_require__(/*! ../../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
class Quiz extends BaseContentItem_1.BaseContentItem {
    static nameProperty = 'title';
    static bodyProperty = 'description';
    static contentUrlTemplate = "/api/v1/courses/{course_id}/quizzes/{content_id}";
    static allContentUrlTemplate = "/api/v1/courses/{course_id}/quizzes";
    async setDueAt(date) {
        const url = `/api/v1/courses/${this.courseId}/quizzes/${this.id}`;
        return (0, fetchJson_1.fetchJson)(url, {
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)({
                    quiz: {
                        due_at: date
                    }
                })
            }
        });
    }
}
exports.Quiz = Quiz;
//# sourceMappingURL=Quiz.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/QuizKind.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/quizzes/QuizKind.js ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizKind = exports.quizUrlFuncs = void 0;
const fetchJson_1 = __webpack_require__(/*! ../../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const ContentKind_1 = __webpack_require__(/*! ../../content/ContentKind */ "./node_modules/@ueu/ueu-canvas/dist/content/ContentKind.js");
exports.quizUrlFuncs = (0, ContentKind_1.contentUrlFuncs)('quizzes');
exports.QuizKind = {
    getId: (data) => data.id,
    getName: (data) => data.title,
    dataIsThisKind: (data) => 'quiz_type' in data,
    getBody: (data) => data.description,
    async get(courseId, contentId, config) {
        const data = await (0, fetchJson_1.fetchJson)(exports.quizUrlFuncs.getApiUrl(courseId, contentId), config);
        return data;
    },
    ...exports.quizUrlFuncs,
    dataGenerator: (courseId, config) => (0, getPagedDataGenerator_1.getPagedDataGenerator)(exports.quizUrlFuncs.getAllApiUrl(courseId), config),
    put: (0, ContentKind_1.putContentFunc)(exports.quizUrlFuncs.getApiUrl),
};
exports["default"] = exports.QuizKind;
//# sourceMappingURL=QuizKind.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/index.js"
/*!********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/quizzes/index.js ***!
  \********************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/content/types.js"
/*!************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/content/types.js ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/Course.js"
/*!************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/Course.js ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = exports.COURSE_CODE_REGEX = void 0;
const baseCanvasObject_1 = __webpack_require__(/*! ../baseCanvasObject */ "./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js");
const blueprint_1 = __webpack_require__(/*! ./blueprint */ "./node_modules/@ueu/ueu-canvas/dist/course/blueprint.js");
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const changeStartDate_1 = __webpack_require__(/*! ./changeStartDate */ "./node_modules/@ueu/ueu-canvas/dist/course/changeStartDate.js");
const modules_1 = __webpack_require__(/*! ./modules */ "./node_modules/@ueu/ueu-canvas/dist/course/modules.js");
const profile_1 = __webpack_require__(/*! ../profile */ "./node_modules/@ueu/ueu-canvas/dist/profile.js");
const toolbox_1 = __webpack_require__(/*! ./toolbox */ "./node_modules/@ueu/ueu-canvas/dist/course/toolbox.js");
const assignments_1 = __webpack_require__(/*! ../content/assignments */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/index.js");
const code_1 = __webpack_require__(/*! ../course/code */ "./node_modules/@ueu/ueu-canvas/dist/course/code.js");
const Term_1 = __webpack_require__(/*! ../term/Term */ "./node_modules/@ueu/ueu-canvas/dist/term/Term.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const utils_1 = __webpack_require__(/*! ../fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const getCourseIdFromUrl_1 = __importDefault(__webpack_require__(/*! ../course/getCourseIdFromUrl */ "./node_modules/@ueu/ueu-canvas/dist/course/getCourseIdFromUrl.js"));
const Quiz_1 = __webpack_require__(/*! ../content/quizzes/Quiz */ "./node_modules/@ueu/ueu-canvas/dist/content/quizzes/Quiz.js");
const Page_1 = __webpack_require__(/*! ../content/pages/Page */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js");
const Discussion_1 = __webpack_require__(/*! ../content/discussions/Discussion */ "./node_modules/@ueu/ueu-canvas/dist/content/discussions/Discussion.js");
const Assignment_1 = __webpack_require__(/*! ../content/assignments/Assignment */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js");
const apiGetConfig_1 = __importDefault(__webpack_require__(/*! ../fetch/apiGetConfig */ "./node_modules/@ueu/ueu-canvas/dist/fetch/apiGetConfig.js"));
const cachedGetAssociatedCoursesFunc_1 = __webpack_require__(/*! ../course/cachedGetAssociatedCoursesFunc */ "./node_modules/@ueu/ueu-canvas/dist/course/cachedGetAssociatedCoursesFunc.js");
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const HOMETILE_WIDTH = 500;
exports.COURSE_CODE_REGEX = /^(.+[^_])?_?(\w{4}\d{3})/i;
class Course extends baseCanvasObject_1.BaseCanvasObject {
    static nameProperty = 'name';
    _modules = undefined;
    modulesByWeekNumber = undefined;
    static contentClasses = [Assignment_1.Assignment, Discussion_1.Discussion, Quiz_1.Quiz, Page_1.Page];
    isBlueprint;
    getAssociatedCourses;
    constructor(data) {
        console.warn("Course is being deprecated");
        super(data);
        this.isBlueprint = (() => (0, blueprint_1.isBlueprint)(data));
        this.getAssociatedCourses = (0, cachedGetAssociatedCoursesFunc_1.cachedGetAssociatedCoursesFunc)(this);
    }
    static async getFromUrl(url = null) {
        if (url === null) {
            url = document.documentURI;
        }
        const match = /courses\/(\d+)/.exec(url);
        if (match) {
            const id = (0, getCourseIdFromUrl_1.default)(url);
            if (!id)
                return null;
            return (0, toolbox_1.getCourseById)(id);
        }
        return null;
    }
    static async getCourseById(courseId, config = undefined) {
        const data = await (0, toolbox_1.getCourseData)(courseId, config);
        return new Course(data);
    }
    static async publishAll(courses, accountId) {
        if (courses.length == 0)
            return false;
        const courseIds = courses.map((course) => {
            if (course instanceof Course) {
                return course.id;
            }
            return course;
        });
        const url = `/api/v1/accounts/${accountId}/courses`;
        const data = {
            'event': 'offer',
            'course_ids': courseIds,
        };
        return await (0, fetchJson_1.fetchJson)(url, {
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)(data),
            }
        });
    }
    get contentUrlPath() {
        return `/api/v1/courses/${this.id}`;
    }
    get courseUrl() {
        return this.htmlContentUrl;
    }
    get htmlContentUrl() {
        return `/courses/${this.id}`;
    }
    get parsedCourseCode() {
        return (0, code_1.parseCourseCode)(this.canvasData.course_code);
    }
    get courseCode() {
        return this.canvasData.course_code;
    }
    get baseCode() {
        return (0, code_1.baseCourseCode)(this.canvasData.course_code);
    }
    get termId() {
        const id = this.canvasData.enrollment_term_id;
        if (typeof id === 'number')
            return id;
        else
            return id[0];
    }
    async getTerm() {
        (0, assert_1.default)(typeof this.termId === 'number');
        if (this.termId)
            return Term_1.Term.getTermById(this.termId);
        else
            return null;
    }
    get fileUploadUrl() {
        return `/api/v1/courses/${this.id}/files`;
    }
    get codePrefix() {
        const match = exports.COURSE_CODE_REGEX.exec(this.rawData.course_code);
        return match ? match[1] : '';
    }
    get workflowState() {
        return this.canvasData.workflow_state;
    }
    get isDev() {
        return !!this.name.match(/^DEV/);
    }
    get rootAccountId() {
        return this.canvasData.root_account_id;
    }
    get accountId() {
        return this.canvasData.account_id;
    }
    async getModules(config) {
        if (this._modules) {
            return this._modules;
        }
        const modules = await (0, canvasUtils_1.renderAsyncGen)((0, modules_1.moduleGenerator)(this.id, {
            queryParams: {
                include: ['items', 'content_details']
            }
        }));
        this._modules = modules;
        return modules;
    }
    async updateModules(config) {
        this._modules = undefined;
        return this.getModules(config);
    }
    async getStartDateFromModules() {
        return (0, changeStartDate_1.getModuleUnlockStartDate)(await this.getModules());
    }
    isUndergrad() {
        if (this.courseCode) {
            const match = this.courseCode.match(/\d{3,4}/);
            if (match)
                return parseInt(match[0], 10) < 500;
        }
        return false;
    }
    isGrad() {
        if (this.courseCode) {
            const match = this.courseCode.match(/\d{3,4}/);
            if (match)
                return parseInt(match[0], 10) >= 500 && parseInt(match[0], 10) < 1000;
        }
        return false;
    }
    isCareerInstitute() {
        if (this.courseCode) {
            const match = this.courseCode.match(/\d{4}/);
            if (match)
                return true;
        }
        return false;
    }
    async getInstructors() {
        return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}/users?enrollment_type=teacher`);
    }
    async getLatePolicy(config) {
        const latePolicyResult = await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}/late_policy`, config);
        if ('late_policy' in latePolicyResult)
            return latePolicyResult.late_policy;
        return undefined;
    }
    async getAvailableGradingStandards(config) {
        let out = [];
        console.log(this.name);
        const { id, account_id, root_account_id } = this.canvasData;
        try {
            if (id) {
                const courseGradingStandards = await (0, toolbox_1.getGradingStandards)(id, "course", config);
                out = [...out, ...courseGradingStandards];
            }
            if (account_id) {
                const accountGradingStandards = await (0, toolbox_1.getGradingStandards)(account_id, 'account', config);
                out = [...out, ...accountGradingStandards];
            }
            if (root_account_id) {
                const rootAccountGradingStandards = await (0, toolbox_1.getGradingStandards)(root_account_id, 'account', config);
                out = [...out, ...rootAccountGradingStandards];
            }
        }
        catch (e) {
            console.warn(e);
        }
        return out.filter(canvasUtils_1.filterUniqueFunc);
    }
    async getCurrentGradingStandard(config) {
        const { grading_standard_id, account_id, root_account_id } = this.canvasData;
        const urls = [];
        if (grading_standard_id) {
            urls.push(`/api/v1/courses/${this.id}/grading_standards/${grading_standard_id}`);
            if (root_account_id)
                urls.push(`/api/v1/accounts/${root_account_id}/grading_standards/${grading_standard_id}`);
            if (account_id)
                urls.push(`/api/v1/accounts/${account_id}/grading_standards/${grading_standard_id}`);
        }
        const standards = (await this.getAvailableGradingStandards(config)).filter(standard => standard.id === grading_standard_id);
        if (standards.length == 0)
            return null;
        return standards[0];
    }
    async getModulesByWeekNumber(config) {
        if (this.modulesByWeekNumber)
            return this.modulesByWeekNumber;
        const modules = await this.getModules(config);
        this.modulesByWeekNumber = await (0, modules_1.getModulesByWeekNumber)(modules);
        return (this.modulesByWeekNumber);
    }
    /**
     * Returns a list of links to items in a given module
     *
     * @param moduleOrWeekNumber
     * @param target An object specifying an item or items to look for
     * type - specifies the type,
     * search - a string to search for in titles. optional.
     * index - return the indexth one of these in the week (minus the intro in week 1, which should be index 0)
     * if none is specified, return all matches
     */
    async getModuleItemLinks(moduleOrWeekNumber, target) {
        (0, assert_1.default)(target.hasOwnProperty('type'));
        const targetType = target.type;
        const contentSearchString = target.hasOwnProperty('search') ? target.search : null;
        let targetIndex = isNaN(target.index) ? null : target.index;
        let targetModuleWeekNumber;
        let targetModule;
        if (typeof moduleOrWeekNumber === 'number') {
            const modules = await this.getModulesByWeekNumber();
            (0, assert_1.default)(modules.hasOwnProperty(moduleOrWeekNumber));
            targetModuleWeekNumber = moduleOrWeekNumber;
            targetModule = modules[targetModuleWeekNumber];
        }
        else {
            targetModule = moduleOrWeekNumber;
            targetModuleWeekNumber = (0, modules_1.getModuleWeekNumber)(targetModule);
        }
        const urls = [];
        if (targetModule && typeof targetType !== 'undefined') {
            //If it's a page, just search for the parameter string
            if (targetType === 'Page' && contentSearchString) {
                const pages = await this.getPages({
                    queryParams: { search_term: contentSearchString }
                });
                pages.forEach((page) => urls.push(page.htmlContentUrl));
                //If it's anything else, get only those items in the module and set url to the targetIndexth one.
            }
            else if (targetType) {
                //bump index for week 1 to account for intro discussion / checking for rubric would require pulling too much data
                //and too much performance overhead
                if (targetIndex && targetType === 'Discussion' && targetModuleWeekNumber === 1)
                    targetIndex++;
                const matchingTypeItems = targetModule.items.filter((item) => item.type === targetType);
                if (targetIndex && matchingTypeItems.length >= targetIndex) {
                    //We refer to and number the assignments indexed at 1, but the array is indexed at 0
                    const targetItem = matchingTypeItems[targetIndex - 1];
                    urls.push(targetItem.html_url);
                }
                else if (!targetIndex) {
                    for (const item of matchingTypeItems)
                        urls.push(item.html_url);
                }
            }
        }
        return urls;
    }
    async getSyllabus(config = { queryParams: {} }) {
        if (this.canvasData.syllabus_body)
            return this.canvasData.syllabus_body;
        const data = await (0, toolbox_1.getCourseData)(this.id, (0, utils_1.fetchGetConfig)({ include: ['syllabus_body'] }, config));
        (0, assert_1.default)(data.syllabus_body);
        this.canvasData.syllabus_body = data.syllabus_body;
        return this.canvasData.syllabus_body;
    }
    // /**
    //  * gets all assignments in a course
    //  * @returns {Promise<Assignment[]>}
    //  * @param config
    //  */
    async getAssignments(config) {
        console.warn('deprecated, use assignmentDataGen instead');
        config = (0, utils_1.overrideConfig)(config, { queryParams: { include: ['due_at'] } });
        const assignmentDatas = await (0, canvasUtils_1.renderAsyncGen)((0, assignments_1.assignmentDataGen)(this.id, config));
        return (assignmentDatas.map(data => new Assignment_1.Assignment(data, this.id)));
    }
    cachedContent = [];
    async getContent(config, refresh = false) {
        if (refresh || this.cachedContent.length == 0) {
            const discussions = await this.getDiscussions(config);
            const assignments = await (0, canvasUtils_1.renderAsyncGen)((0, assignments_1.assignmentDataGen)(this.id, config));
            const quizzes = await this.getQuizzes(config);
            const pages = await this.getPages(config);
            this.cachedContent = [
                ...discussions,
                ...assignments.map(a => new Assignment_1.Assignment(a, this.id)),
                ...quizzes,
                ...pages
            ];
        }
        return this.cachedContent;
    }
    async getDiscussions(config) {
        return await Discussion_1.Discussion.getAllInCourse(this.id, config);
    }
    async getAssignmentGroups(config) {
        return await (0, getPagedDataGenerator_1.getPagedData)(`/api/v1/courses/${this.id}/assignment_groups`, config);
    }
    async getQuizzes(config) {
        return await Quiz_1.Quiz.getAllInCourse(this.id, config);
    }
    async getSubsections() {
        const url = `/api/v1/courses/${this.id}/sections`;
        return await (0, fetchJson_1.fetchJson)(url);
    }
    async getTabs(config) {
        return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}/tabs`, config);
    }
    async getFrontPage() {
        try {
            const data = await (0, fetchJson_1.fetchJson)(`${this.contentUrlPath}/front_page`);
            return new Page_1.Page(data, this.id);
        }
        catch (error) {
            return null;
        }
    }
    getTab(label) {
        return this.canvasData.tabs?.find((tab) => tab.label === label) || null;
    }
    async reload() {
        const id = this.id;
        const reloaded = await Course.getCourseById(id);
        this.canvasData = reloaded.rawData;
    }
    async changeSyllabus(newHtml) {
        this.canvasData['syllabus_body'] = newHtml;
        return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}`, {
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)({
                    course: {
                        syllabus_body: newHtml
                    }
                })
            }
        });
    }
    async publish() {
        const url = `/api/v1/courses/${this.id}`;
        const courseData = await (0, fetchJson_1.fetchJson)(url, {
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)({ 'offer': true })
            }
        });
        console.log(courseData);
        this.canvasData = courseData;
    }
    get devCode() {
        return 'DEV_' + this.baseCode;
    }
    async getParentCourse(return_dev_search = false) {
        const migrations = await (0, getPagedDataGenerator_1.getPagedData)(`/api/v1/courses/${this.id}/content_migrations`);
        const parentCode = this.devCode;
        if (migrations.length < 1) {
            console.log('no migrations found');
            if (return_dev_search) {
                return (0, toolbox_1.getSingleCourse)(parentCode, this.getAccountIds());
            }
            else
                return;
        }
        migrations.sort((a, b) => b.id - a.id);
        try {
            for (const migration of migrations) {
                const course = await Course.getCourseById(migration['settings']['source_course_id']);
                if (course && course.codePrefix.includes("DEV"))
                    return course;
            }
        }
        catch (e) {
            return await (0, toolbox_1.getSingleCourse)(parentCode, this.getAccountIds());
        }
        return await (0, toolbox_1.getSingleCourse)(parentCode, this.getAccountIds());
    }
    getAccountIds() {
        return [this.accountId, this.rootAccountId].filter(a => typeof a !== 'undefined' && a !== null);
    }
    // async regenerateHomeTiles() {
    //     const modules = await this.getModules();
    //     const urls = await Promise.all(modules.map(async (module) => {
    //         try {
    //             const dataUrl = await this.generateHomeTile(module)
    //
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }));
    //     console.log('done');
    //
    // }
    // async generateHomeTile(module: IModuleData) {
    //     const overviewPage = await getModuleOverview(module, this.id);
    //     if (!overviewPage) throw new Error("Module does not have an overview");
    //     const bannerImg = getBannerImage(overviewPage);
    //     if (!bannerImg) throw new Error("No banner image on page");
    //     const resizedImageBlob = await getResizedBlob(bannerImg.src, HOMETILE_WIDTH);
    //     const fileName = `hometile${module.position}.png`;
    //     assert(resizedImageBlob);
    //     const file = new File([resizedImageBlob], fileName)
    //     return await uploadFile(file, 'Images/hometile', this.fileUploadUrl);
    // }
    getPages(config = null) {
        return Page_1.Page.getAllInCourse(this.id, config);
    }
    async getFrontPageProfile() {
        const frontPage = await this.getFrontPage();
        try {
            (0, assert_1.default)(frontPage && frontPage.body, "Course front page not found");
            const frontPageProfile = (0, profile_1.getCurioPageFrontPageProfile)(frontPage?.body);
            frontPageProfile.sourcePage = frontPage;
            return frontPageProfile;
        }
        catch (e) {
            return {
                bio: 'NOT FOUND',
                sourcePage: frontPage,
            };
        }
    }
    async getPotentialInstructorProfiles() {
        try {
            const instructors = await this.getInstructors();
            let profiles = [];
            if (!instructors)
                return profiles;
            for (const instructor of instructors) {
                profiles = profiles.concat(await (0, profile_1.getPotentialFacultyProfiles)(instructor));
            }
            return profiles;
        }
        catch (e) {
            return [];
        }
    }
    async getSettings(config) {
        return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}/settings`, config);
    }
    async updateSettings(newSettings, config) {
        const configToUse = (0, apiGetConfig_1.default)(newSettings, config);
        return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${this.id}/settings`, configToUse);
    }
}
exports.Course = Course;
//# sourceMappingURL=Course.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/blueprint.js"
/*!***************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/blueprint.js ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBlueprint = isBlueprint;
exports.genBlueprintDataForCode = genBlueprintDataForCode;
exports.sectionDataGenerator = sectionDataGenerator;
exports.beginBpSync = beginBpSync;
exports.getBlueprintsFromCode = getBlueprintsFromCode;
exports.lockBlueprint = lockBlueprint;
exports.setAsBlueprint = setAsBlueprint;
exports.unSetAsBlueprint = unSetAsBlueprint;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const toolbox_1 = __webpack_require__(/*! ./toolbox */ "./node_modules/@ueu/ueu-canvas/dist/course/toolbox.js");
const code_1 = __webpack_require__(/*! ../course/code */ "./node_modules/@ueu/ueu-canvas/dist/course/code.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const utils_1 = __webpack_require__(/*! ../fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const apiWriteConfig_1 = __importDefault(__webpack_require__(/*! ../fetch/apiWriteConfig */ "./node_modules/@ueu/ueu-canvas/dist/fetch/apiWriteConfig.js"));
function isBlueprint({ blueprint }) {
    return !!blueprint;
}
//W
function genBlueprintDataForCode(courseCode, accountIds, queryParams) {
    if (!courseCode) {
        console.warn("Course code not present");
        return null;
    }
    const baseCode = (0, code_1.baseCourseCode)(courseCode);
    if (!baseCode) {
        console.warn(`Code ${courseCode} invalid`);
        return null;
    }
    return (0, toolbox_1.getCourseDataGenerator)(baseCode, accountIds, undefined, (0, utils_1.fetchGetConfig)({
        blueprint: true,
        include: ['concluded'],
    }, { queryParams }));
}
function sectionDataGenerator(courseId, config) {
    const url = `/api/v1/courses/${courseId}/blueprint_templates/default/associated_courses`;
    return (0, getPagedDataGenerator_1.getPagedDataGenerator)(url, config);
}
async function beginBpSync(courseId, { message, copy_settings, config }) {
    const url = `/api/v1/courses/${courseId}/blueprint_templates/default/migrations`;
    if (typeof copy_settings === 'undefined')
        copy_settings = true;
    return await (0, fetchJson_1.fetchJson)(url, (0, apiWriteConfig_1.default)('POST', {
        message,
        copy_settings
    }, config));
}
async function getBlueprintsFromCode(code, accountIds, config) {
    const [_, baseCode] = code.match(/_(\w{4}\d{3})$/) || [];
    if (!baseCode)
        return null;
    const bps = (0, toolbox_1.getCourseGenerator)(`BP_${baseCode}`, accountIds, undefined, config);
    return (await (0, canvasUtils_1.renderAsyncGen)(bps)).toSorted((a, b) => b.name.length - a.name.length);
}
async function lockBlueprint(courseId, modules) {
    let items = [];
    items = items.concat(...modules.map(a => [].concat(...a.items)));
    const promises = items.map(async (item) => {
        const url = `/api/v1/courses/${courseId}/blueprint_templates/default/restrict_item`;
        const { type, id } = await (0, canvasUtils_1.getItemTypeAndId)(item);
        if (typeof id === 'undefined')
            return;
        const body = {
            "content_type": type,
            "content_id": id,
            "restricted": true,
            "_method": 'PUT'
        };
        await (0, fetchJson_1.fetchJson)(url, {
            fetchInit: {
                method: 'PUT',
                body: (0, canvasUtils_1.formDataify)(body)
            }
        });
    });
    await Promise.all(promises);
}
async function setAsBlueprint(courseId, config) {
    const url = `/api/v1/courses/${courseId}`;
    const payload = {
        course: {
            blueprint: true,
            use_blueprint_restrictions_by_object_type: 0,
            blueprint_restrictions: {
                content: 1,
                points: 1,
                due_dates: 1,
                availability_dates: 1,
            }
        }
    };
    return await (0, fetchJson_1.fetchJson)(url, (0, apiWriteConfig_1.default)('PUT', payload, config));
}
async function unSetAsBlueprint(courseId, config) {
    const url = `/api/v1/courses/${courseId}`;
    const payload = {
        course: {
            blueprint: false
        }
    };
    return await (0, fetchJson_1.fetchJson)(url, (0, apiWriteConfig_1.default)("PUT", payload, config));
}
//# sourceMappingURL=blueprint.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/cachedGetAssociatedCoursesFunc.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/cachedGetAssociatedCoursesFunc.js ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cachedGetAssociatedCoursesFunc = cachedGetAssociatedCoursesFunc;
const getSections_1 = __webpack_require__(/*! ../course/getSections */ "./node_modules/@ueu/ueu-canvas/dist/course/getSections.js");
function cachedGetAssociatedCoursesFunc(course) {
    let cache = null;
    return async (redownload = false) => {
        if (!redownload && cache)
            return cache;
        cache = await (0, getSections_1.getSections)(course.id);
        return cache;
    };
}
//# sourceMappingURL=cachedGetAssociatedCoursesFunc.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/changeStartDate.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/changeStartDate.js ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoAssignmentsWithDueDatesError = exports.MalformedSyllabusError = exports.NoOverviewModuleFoundError = void 0;
exports.getModuleUnlockStartDate = getModuleUnlockStartDate;
exports.sortAssignmentsByDueDate = sortAssignmentsByDueDate;
exports.getStartDateAssignments = getStartDateAssignments;
exports.getStartDateFromSyllabus = getStartDateFromSyllabus;
exports.getUpdatedStyleTermName = getUpdatedStyleTermName;
exports.getOldUgTermName = getOldUgTermName;
exports.getNewTermName = getNewTermName;
exports.updatedDateSyllabusHtml = updatedDateSyllabusHtml;
exports.syllabusHeaderName = syllabusHeaderName;
const temporal_polyfill_1 = __webpack_require__(/*! temporal-polyfill */ "./node_modules/temporal-polyfill/index.cjs");
const date_1 = __webpack_require__(/*! ../date */ "./node_modules/@ueu/ueu-canvas/dist/date.js");
const Assignment_1 = __webpack_require__(/*! ../content/assignments/Assignment */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/Assignment.js");
const content_1 = __webpack_require__(/*! ../content */ "./node_modules/@ueu/ueu-canvas/dist/content/index.js");
const DEFAULT_LOCALE = "en-US";
function getModuleUnlockStartDate(modules) {
    if (modules.length == 0)
        throw new NoOverviewModuleFoundError();
    const overviewModule = modules[0];
    const unlockDateString = overviewModule.unlock_at;
    if (!unlockDateString)
        return null;
    const oldDate = new Date(unlockDateString);
    return (0, date_1.oldDateToPlainDate)(oldDate);
}
//This may be unnecessary, as the API call is now pulling by due_at date.
function sortAssignmentsByDueDate(assignments) {
    return assignments.toSorted((a, b) => {
        a = a instanceof Assignment_1.Assignment ? a.rawData : a;
        b = b instanceof Assignment_1.Assignment ? b.rawData : b;
        if (a.due_at && b.due_at) {
            return (0, date_1.oldDateToPlainDate)(new Date(b.due_at)).until((0, date_1.oldDateToPlainDate)(new Date(a.due_at))).days;
        }
        if (a.due_at)
            return -1;
        if (b.due_at)
            return 1;
        return 0;
    });
}
async function getStartDateAssignments(courseId) {
    const assignmentGen = (0, content_1.assignmentDataGen)(courseId, {
        queryParams: {
            order_by: "due_at",
            per_page: 2,
        },
    });
    let assignmentDueAt;
    for await (const assignment of assignmentGen) {
        if (assignment.due_at) {
            assignmentDueAt = assignment.due_at;
            break;
        }
    }
    if (!assignmentDueAt)
        throw new NoAssignmentsWithDueDatesError();
    //Set to monday of that week.
    const firstAssignmentDue = new Date(assignmentDueAt);
    const plainDateDue = (0, date_1.oldDateToPlainDate)(firstAssignmentDue);
    const dayOfWeekOffset = 1 - plainDateDue.dayOfWeek;
    return plainDateDue.add({ days: dayOfWeekOffset });
}
function getStartDateFromSyllabus(syllabusHtml, locale = DEFAULT_LOCALE) {
    const syllabusBody = document.createElement("div");
    syllabusBody.innerHTML = syllabusHtml;
    const syllabusCalloutBox = syllabusBody.querySelector("div.cbt-callout-box");
    if (!syllabusCalloutBox)
        throw new MalformedSyllabusError("Can't find syllabus callout box");
    const paras = Array.from(syllabusCalloutBox.querySelectorAll("p"));
    const strongParas = paras.filter((para) => para.querySelector("strong"));
    if (strongParas.length < 5)
        throw new MalformedSyllabusError(`Missing syllabus headers\n${strongParas}`);
    const termNameEl = strongParas[1];
    const datesEl = strongParas[2];
    let dateRange = (0, date_1.findDateRange)(datesEl.innerHTML, locale);
    if (!dateRange)
        throw new MalformedSyllabusError("Date range not found in syllabus");
    const termName = termNameEl.textContent || "";
    let yearToUse;
    const yearMatchNew = termName.match(/\.(\d{2})$/);
    if (yearMatchNew) {
        yearToUse = 2000 + parseInt(yearMatchNew[1]);
    }
    else {
        const yearMatchOld = termName.match(/DE-(\d{2})-/);
        if (yearMatchOld) {
            yearToUse = 2000 + parseInt(yearMatchOld[1]);
        }
    }
    if (yearToUse) {
        dateRange = {
            start: temporal_polyfill_1.Temporal.PlainDate.from({
                year: yearToUse,
                month: dateRange.start.month,
                day: dateRange.start.day,
            }),
            end: temporal_polyfill_1.Temporal.PlainDate.from({
                year: yearToUse,
                month: dateRange.end.month,
                day: dateRange.end.day,
            }),
        };
    }
    return dateRange.start;
}
function getUpdatedStyleTermName(termStart, weekCount, locale = DEFAULT_LOCALE) {
    const month = termStart.toLocaleString(locale, { month: "2-digit" });
    const day = termStart.toLocaleString(locale, { day: "2-digit" });
    const year = termStart.toLocaleString(locale, { year: "2-digit" });
    return `DE${weekCount}W${month}.${day}.${year}`;
}
function getOldUgTermName(termStart) {
    const year = termStart.toLocaleString(DEFAULT_LOCALE, { year: "2-digit" });
    const month = termStart.toLocaleString(DEFAULT_LOCALE, { month: "short" });
    return `DE-${year}-${month}`;
}
function getNewTermName(oldTermName, newTermStart, isGrad = undefined) {
    const [termName, weekCount] = oldTermName.match(/DE(\d)W\d\d\.\d\d\.\d\d/) || [];
    if (termName)
        return getUpdatedStyleTermName(newTermStart, weekCount);
    const termNameUg = oldTermName.match(/(DE(?:.HL|)-\d\d)-(\w+)\w{2}?/i);
    const newWeekCount = isGrad ? 8 : 5;
    if (termNameUg)
        return getUpdatedStyleTermName(newTermStart, newWeekCount);
    throw new MalformedSyllabusError(`Can't Recognize Term Name ${oldTermName}`);
}
function updatedDateSyllabusHtml(html, newStartDate, isGrad = undefined, locale = DEFAULT_LOCALE) {
    const syllabusBody = document.createElement("div");
    syllabusBody.innerHTML = html;
    const syllabusCalloutBox = syllabusBody.querySelector("div.cbt-callout-box");
    if (!syllabusCalloutBox)
        throw new MalformedSyllabusError("Can't find syllabus callout box");
    const paras = Array.from(syllabusCalloutBox.querySelectorAll("p"));
    const strongParas = paras.filter((para) => para.querySelector("strong"));
    if (strongParas.length < 5)
        throw new MalformedSyllabusError(`Missing syllabus headers\n${strongParas}`);
    const [_courseNameEl, termNameEl, datesEl, _instructorNameEl, _instructorContactInfoEl, _creditsEl] = strongParas;
    const changedText = [];
    const oldTermName = termNameEl.textContent || "";
    const oldDates = datesEl.textContent || "";
    const dateRange = (0, date_1.findDateRange)(datesEl.innerHTML, locale);
    if (!dateRange)
        throw new MalformedSyllabusError("Date range not found in syllabus");
    const courseDuration = dateRange.start.until(dateRange.end);
    const newEndDate = newStartDate.add(courseDuration);
    const newTermName = getNewTermName(oldTermName, newStartDate, isGrad);
    const dateRangeText = `${dateToSyllabusString(newStartDate)} - ${dateToSyllabusString(newEndDate)}`;
    termNameEl.innerHTML = `<strong>${syllabusHeaderName(termNameEl)}:</strong><span> ${newTermName}</span>`;
    datesEl.innerHTML = `<strong>${syllabusHeaderName(datesEl)}:</strong><span> ${dateRangeText}</span>`;
    changedText.push(`${oldTermName} -> ${termNameEl.textContent}`);
    changedText.push(`${oldDates} -> ${datesEl.textContent}`);
    const output = {
        html: syllabusBody.innerHTML.replaceAll(/<p>\s*(&nbsp;)?<\/p>/gi, ""),
        changedText,
    };
    syllabusBody.remove();
    return output;
}
function dateToSyllabusString(date) {
    return `${date.toLocaleString(DEFAULT_LOCALE, { month: "long", day: "numeric" })}`;
}
function syllabusHeaderName(el) {
    // eslint-disable-next-line prefer-const
    let [_, head] = /([^:]*):/.exec(el.innerHTML) ?? [];
    head = head?.replaceAll(/<[^>]*>/g, "");
    return head;
}
class NoOverviewModuleFoundError extends Error {
    name = "NoOverviewModuleFoundError";
}
exports.NoOverviewModuleFoundError = NoOverviewModuleFoundError;
class MalformedSyllabusError extends Error {
    name = "MalformedSyllabusError";
}
exports.MalformedSyllabusError = MalformedSyllabusError;
class NoAssignmentsWithDueDatesError extends Error {
    name = "NoAssignmentsWithDueDatesError";
}
exports.NoAssignmentsWithDueDatesError = NoAssignmentsWithDueDatesError;
//# sourceMappingURL=changeStartDate.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/code.js"
/*!**********************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/code.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MalformedCourseCodeError = void 0;
exports.parseCourseCode = parseCourseCode;
exports.baseCourseCode = baseCourseCode;
exports.stringIsCourseCode = stringIsCourseCode;
const Course_1 = __webpack_require__(/*! ../course/Course */ "./node_modules/@ueu/ueu-canvas/dist/course/Course.js");
function parseCourseCode(code) {
    const match = Course_1.COURSE_CODE_REGEX.exec(code);
    if (!match)
        return null;
    const prefix = match[1] || "";
    const courseCode = match[2] || "";
    if (prefix.length > 0) {
        return `${prefix}_${courseCode}`;
    }
    return courseCode;
}
function baseCourseCode(code) {
    const match = Course_1.COURSE_CODE_REGEX.exec(code);
    if (!match)
        return null;
    return match[2];
}
function stringIsCourseCode(code) {
    return Course_1.COURSE_CODE_REGEX.exec(code);
}
class MalformedCourseCodeError extends Error {
    name = "MalformedCourseCodeError";
    courseCode;
    constructor(courseCode, message, options) {
        if (!message)
            message = `${courseCode} is not a valid course code`;
        super(message, options);
        this.courseCode = courseCode;
    }
}
exports.MalformedCourseCodeError = MalformedCourseCodeError;
//# sourceMappingURL=code.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/getCourseIdFromUrl.js"
/*!************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/getCourseIdFromUrl.js ***!
  \************************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCourseIdFromUrl = getCourseIdFromUrl;
function getCourseIdFromUrl(url) {
    const match = /courses\/(\d+)/.exec(url);
    if (match) {
        return parseInt(match[1]);
    }
    return null;
}
exports["default"] = getCourseIdFromUrl;
//# sourceMappingURL=getCourseIdFromUrl.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/getSections.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/getSections.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSections = getSections;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const Course_1 = __webpack_require__(/*! ../course/Course */ "./node_modules/@ueu/ueu-canvas/dist/course/Course.js");
const blueprint_1 = __webpack_require__(/*! ../course/blueprint */ "./node_modules/@ueu/ueu-canvas/dist/course/blueprint.js");
async function getSections(courseId, config) {
    return (await (0, canvasUtils_1.renderAsyncGen)((0, blueprint_1.sectionDataGenerator)(courseId, config))).map(section => new Course_1.Course(section));
}
//# sourceMappingURL=getSections.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/modules.js"
/*!*************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/modules.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isQuizItemData = exports.isDiscussionItemData = exports.isAssignmentItemData = exports.isPageItemData = void 0;
exports.saveModuleItem = saveModuleItem;
exports.moduleGenerator = moduleGenerator;
exports.changeModuleLockDate = changeModuleLockDate;
exports.getModuleOverview = getModuleOverview;
exports.getModuleWeekNumber = getModuleWeekNumber;
exports.getModulesByWeekNumber = getModulesByWeekNumber;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const Page_1 = __webpack_require__(/*! ../content/pages/Page */ "./node_modules/@ueu/ueu-canvas/dist/content/pages/Page.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
async function saveModuleItem(courseId, moduleId, moduleItemId, moduleItem) {
    return await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${courseId}/modules/${moduleId}/modules/items/${moduleItemId}`, {
        fetchInit: {
            method: "PUT",
            body: (0, canvasUtils_1.formDataify)({ moduleItem: moduleItem }),
        }
    });
}
function moduleGenerator(courseId, config) {
    return (0, getPagedDataGenerator_1.getPagedDataGenerator)(`/api/v1/courses/${courseId}/modules`, config);
}
async function changeModuleLockDate(courseId, module, targetDate) {
    const payload = {
        module: {
            unlock_at: targetDate.toString()
        }
    };
    const url = `/api/v1/courses/${courseId}/modules/${module.id}`;
    const result = (0, fetchJson_1.fetchJson)(url, {
        fetchInit: {
            method: 'PUT',
            body: (0, canvasUtils_1.formDataify)(payload)
        }
    });
}
async function getModuleOverview(module, courseId) {
    const overview = module.items.find(item => item.type === "Page" &&
        item.title.toLowerCase().includes('overview'));
    if (!overview?.url)
        return; //skip this if it's not an overview
    const url = overview.url.replace(/.*\/api\/v1/, '/api/v1');
    const pageData = await (0, fetchJson_1.fetchJson)(url);
    return new Page_1.Page(pageData, courseId);
}
function getModuleWeekNumber(module) {
    const regex = /(week|module) (\d+)/i;
    const match = module.name.match(regex);
    let weekNumber = !match ? null : Number(match[1]);
    if (!weekNumber) {
        for (const moduleItem of module.items) {
            if (!moduleItem.hasOwnProperty('title')) {
                continue;
            }
            const match = moduleItem.title.match(regex);
            if (match) {
                weekNumber = match[2];
            }
        }
    }
    return weekNumber;
}
async function getModulesByWeekNumber(modules) {
    const modulesByWeekNumber = {};
    for (const module of modules) {
        const weekNumber = getModuleWeekNumber(module);
        if (weekNumber) {
            modulesByWeekNumber[weekNumber] = module;
        }
    }
    return modulesByWeekNumber;
}
const isModuleItemTypeFunc = (typeString) => (item) => {
    return item.type === typeString;
};
exports.isPageItemData = isModuleItemTypeFunc("Page");
exports.isAssignmentItemData = isModuleItemTypeFunc("Assignment");
exports.isDiscussionItemData = isModuleItemTypeFunc("Discussion");
exports.isQuizItemData = isModuleItemTypeFunc("Quiz");
//# sourceMappingURL=modules.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/course/toolbox.js"
/*!*************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/course/toolbox.js ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseNotFoundException = void 0;
exports.getGradingStandards = getGradingStandards;
exports.getCourseData = getCourseData;
exports.getCourseDataGenerator = getCourseDataGenerator;
exports.getCourseGenerator = getCourseGenerator;
exports.getSingleCourse = getSingleCourse;
exports.getCourseById = getCourseById;
exports.createNewCourse = createNewCourse;
exports.saveCourseData = saveCourseData;
exports.setGradingStandardForCourse = setGradingStandardForCourse;
exports.getCourseName = getCourseName;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const Course_1 = __webpack_require__(/*! ./Course */ "./node_modules/@ueu/ueu-canvas/dist/course/Course.js");
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
const utils_1 = __webpack_require__(/*! ../fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
async function getGradingStandards(contextId, contextType, config) {
    const url = `/api/v1/${contextType}s/${contextId}/grading_standards`;
    return await (0, getPagedDataGenerator_1.getPagedData)(url, config);
}
function getCourseData(id, config) {
    const url = `/api/v1/courses/${id}`;
    return (0, fetchJson_1.fetchJson)(url, config);
}
function getCourseDataGenerator(queryString, accountIds, term, config) {
    if (!Array.isArray(accountIds))
        accountIds = [accountIds];
    const defaultConfig = queryString ? {
        queryParams: {
            search_term: queryString,
        }
    } : {};
    const termId = typeof term === 'number' ? term : term?.id;
    if (termId && defaultConfig.queryParams)
        defaultConfig.queryParams.enrollment_term_id = termId;
    config = (0, utils_1.overrideConfig)(defaultConfig, config);
    const generators = accountIds.map(accountId => {
        const url = `/api/v1/accounts/${accountId}/courses`;
        return (0, getPagedDataGenerator_1.getPagedDataGenerator)(url, config);
    });
    return (0, getPagedDataGenerator_1.mergePagedDataGenerators)(generators);
}
function getCourseGenerator(queryString, accountIds, term, config) {
    return (0, canvasUtils_1.generatorMap)(getCourseDataGenerator(queryString, accountIds, term, config), courseData => new Course_1.Course(courseData));
}
async function getSingleCourse(queryString, accountIds, term, config) {
    for (const accountId of accountIds) {
        const courseDatas = await (0, fetchJson_1.fetchJson)(`/api/v1/accounts/${accountId}/courses`, (0, utils_1.overrideConfig)({ queryParams: { search_term: queryString } }, config));
        if (courseDatas.length > 0)
            return new Course_1.Course(courseDatas[0]);
    }
    return undefined;
}
async function getCourseById(id, config) {
    return new Course_1.Course(await (0, fetchJson_1.fetchJson)(`/api/v1/courses/${id}`, config));
}
async function createNewCourse(courseCode, accountId, name, config) {
    name ??= courseCode;
    const createUrl = `/api/v1/accounts/${accountId}/courses/`;
    const createConfig = {
        fetchInit: {
            method: 'POST',
            body: (0, canvasUtils_1.formDataify)({
                course: {
                    name,
                    course_code: courseCode
                }
            })
        }
    };
    return await (0, fetchJson_1.fetchJson)(createUrl, (0, canvasUtils_1.deepObjectMerge)(createConfig, config, true));
}
class CourseNotFoundException extends Error {
}
exports.CourseNotFoundException = CourseNotFoundException;
async function saveCourseData(courseId, data, config) {
    const url = `/api/v1/courses/${courseId}`;
    return await (0, fetchJson_1.fetchJson)(url, (0, utils_1.overrideConfig)(config, {
        fetchInit: {
            method: 'PUT',
            body: (0, canvasUtils_1.formDataify)({ course: data })
        }
    }));
}
async function setGradingStandardForCourse(courseId, standardId, config) {
    return await saveCourseData(courseId, { grading_standard_id: standardId });
}
function getCourseName(data) {
    const [full, withoutCode] = /[^:]*:\s*(.*)/.exec(data.name) ?? [];
    if (withoutCode)
        return withoutCode;
    return data.name;
}
//# sourceMappingURL=toolbox.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/date.js"
/*!***************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/date.js ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MalformedDateError = exports.StringNotAMonthDateError = void 0;
exports.findDateRange = findDateRange;
exports.oldDateToPlainDate = oldDateToPlainDate;
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const canvasUtils_1 = __webpack_require__(/*! ./canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const temporal_polyfill_1 = __webpack_require__(/*! temporal-polyfill */ "./node_modules/temporal-polyfill/index.cjs");
function getMonthNames(style = "long", locale = 'en-US') {
    return Array.from((0, canvasUtils_1.range)(1, 12)).map((monthInt) => {
        return temporal_polyfill_1.Temporal.PlainDate.from({
            day: 1,
            month: monthInt,
            year: temporal_polyfill_1.Temporal.Now.plainDateISO().year
        }).toLocaleString(locale, {
            month: style
        });
    });
}
/**
 * takes a string of formatted [monthname] [date] and give a plain date
 * @param value the string to evaluate
 * @param locale the locale to use to generate month names, e.g. en-US
 * @param year the year to give the date object. If not provided defaults to current year.
 */
function plainDateFromMonthDayString(value, locale, year) {
    year ??= temporal_polyfill_1.Temporal.Now.plainDateISO().year;
    const match = value.match(getDateRegexString(locale));
    if (!match)
        throw new MalformedDateError(value);
    const fullDate = match[1];
    return temporal_polyfill_1.Temporal.PlainDate.from({
        month: getMonthNumberLut(locale)[match[2]],
        day: parseInt(match[3]),
        year
    });
}
const monthNumberLutCache = {};
/**
 * returns a string with 3 capturing groups -- 1 - month date, 2 month, 3 date. cuts off rd/th...
 * @param locale
 */
function getMonthNumberLut(locale) {
    if (monthNumberLutCache[locale])
        return monthNumberLutCache[locale];
    const monthNames = getMonthNames('long', locale);
    const shortMonthNames = getMonthNames('short', locale);
    const monthNumberLut = {};
    (0, assert_1.default)(monthNames.length === shortMonthNames.length);
    for (let i = 0; i < monthNames.length; i++) {
        monthNumberLut[monthNames[i]] = i + 1;
        monthNumberLut[shortMonthNames[i]] = i + 1;
    }
    monthNumberLutCache[locale] = monthNumberLut;
    return monthNumberLut;
}
const dateRegexStringCache = {};
//TODO: Make the capture groups in this optional
function getDateRegexString(locale = 'en-US') {
    if (dateRegexStringCache[locale])
        return dateRegexStringCache[locale];
    const monthNames = getMonthNames('long', locale);
    const shortMonthNames = getMonthNames('short', locale);
    const monthRegexDatePart = `(?:${[...monthNames, ...shortMonthNames].join('|')})`;
    const output = `((${monthRegexDatePart}) (\\d+))(?:\\w{2}|)`;
    dateRegexStringCache[locale] = output;
    return output;
}
/**
 * Looks for a date range in text and, if found, returns an object with start and end params as Temporal PlainDates
 * @param textToSearch
 * @param locale
 */
function findDateRange(textToSearch, locale = 'en-US') {
    const dateRegExString = getDateRegexString(locale);
    const searchRegex = new RegExp(`(${dateRegExString}).*(${dateRegExString})`, 'i');
    const dateRegex = new RegExp(dateRegExString, 'i');
    const matchRange = textToSearch.match(searchRegex);
    if (!matchRange)
        return null; //No date range found in syllabus
    let start, end;
    for (const separator of ['-', 'to']) {
        [start, end] = matchRange[0].split(separator);
        if (start && end)
            break;
    }
    if (!start || !end)
        throw new MalformedDateError('Cannot find date range in syllabus');
    const startMatch = start.match(dateRegex);
    const endMatch = end.match(dateRegex);
    if (!startMatch)
        throw new MalformedDateError(`Missing Start Date ${start}`);
    if (!endMatch)
        throw new MalformedDateError(`Missing End Date ${end}`);
    return {
        start: plainDateFromMonthDayString(startMatch[0], locale),
        end: plainDateFromMonthDayString(endMatch[0], locale)
    };
}
function oldDateToPlainDate(date) {
    const data = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
    return temporal_polyfill_1.Temporal.PlainDate.from(data);
}
class StringNotAMonthDateError extends Error {
    name = "StringNotAMonthDateError";
}
exports.StringNotAMonthDateError = StringNotAMonthDateError;
class MalformedDateError extends Error {
    name = "MalformedDateError";
}
exports.MalformedDateError = MalformedDateError;
//# sourceMappingURL=date.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/fetch/apiGetConfig.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/fetch/apiGetConfig.js ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiGetConfig = apiGetConfig;
const utils_1 = __webpack_require__(/*! ../fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
function apiGetConfig(queryParams, baseConfig) {
    return (0, utils_1.overrideConfig)({
        queryParams,
    }, baseConfig);
}
exports["default"] = apiGetConfig;
//# sourceMappingURL=apiGetConfig.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/fetch/apiWriteConfig.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/fetch/apiWriteConfig.js ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiWriteConfig = apiWriteConfig;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const utils_1 = __webpack_require__(/*! ../fetch/utils */ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js");
function apiWriteConfig(method, data, baseConfig) {
    const body = (0, canvasUtils_1.formDataify)(data);
    return (0, utils_1.overrideConfig)({
        fetchInit: {
            method,
            body,
        }
    }, baseConfig);
}
exports["default"] = apiWriteConfig;
//# sourceMappingURL=apiWriteConfig.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js"
/*!**************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js ***!
  \**************************************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchJson = fetchJson;
async function fetchJson(url, config = null) {
    const match = url.search(/^(\/|\w+:\/\/)/);
    if (match < 0)
        throw new Error("url does not start with / or http");
    if (config?.queryParams) {
        url += '?' + new URLSearchParams(config.queryParams);
    }
    config ??= {};
    const response = await fetch(url, config.fetchInit);
    const responseJson = await response.json();
    if (!responseJson)
        throw new Error("Could not fetch json");
    responseJson.retrieved_at = new Date().toISOString();
    return responseJson;
}
//# sourceMappingURL=fetchJson.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPagedData = getPagedData;
exports.mergePagedDataGenerators = mergePagedDataGenerators;
exports.getPagedDataGenerator = getPagedDataGenerator;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
/**
 * @param url The entire path of the url
 * @param config a configuration object of type ICanvasCallConfig
 * @returns {Promise<Record<string, any>[]>}
 */
async function getPagedData(url, config = null) {
    const generator = getPagedDataGenerator(url, config);
    const out = [];
    for await (const value of generator) {
        out.push(value);
    }
    return out;
}
/**
 * Merges multiple asynchronous paginated data generators into a single generator.
 *
 * This function combines the results of multiple paginated data generators into a unified stream. Each generator
 * is processed sequentially, and its results are yielded one by one as they become available. This allows for
 * easy handling of multiple paginated API requests or data sources in parallel without needing to collect all
 * results in memory at once.
 *
 * The function is particularly useful when dealing with multiple sources of paginated data (e.g., multiple API
 * endpoints) that need to be processed as one continuous stream of results, without waiting for all pages from one
 * source to finish before beginning to process the next.
 *
 * @template T - A type parameter that extends `CanvasData`, ensuring that the data being yielded is in a format consistent
 *               with Canvas API data structures.
 * @param {AsyncGenerator<T, T[], void>[]} generators - An array of asynchronous generators, each of which yields paginated
 *               results of type `T`. These could represent different paginated data sources that are combined into a single stream.
 *
 * @yields {T} - The function yields items of type `T` as they are retrieved from each generator in sequence.
 *
 * @example
 * // Example usage combining two paginated API responses into a single data stream
 * const generator1 = fetchPagedDataFromSource1();
 * const generator2 = fetchPagedDataFromSource2();
 *
 * for await (const data of mergePagedDataGenerators([generator1, generator2])) {
 *     console.log(data); // Process each item from both generators as a single stream
 * }
 *
 */
async function* mergePagedDataGenerators(generators) {
    for (const generator of generators) {
        for await (const result of generator) {
            yield result;
        }
    }
}
/**
 * Handles the response data from a Canvas API call, normalizing it into an array of `CanvasData` objects.
 *
 * This function accepts various formats of the data (single object, array of objects, or a keyed object containing arrays of objects),
 * and ensures the result is always an array. If no valid array is found, it returns an empty array and logs a warning.
 *
 * @template T - A type that extends `CanvasData`.
 * @param {T | T[] | { [key: string]: T[] }} data - The response data to process. This can be a single object, an array of objects,
 *        or a keyed object where the values are arrays of objects.
 * @param {string} url - The URL from which the data was retrieved, used for logging purposes if no valid data is found.
 * @returns {T[]} An array of `CanvasData` objects, or an empty array if no valid array of data is present.
 */
function handleResponseData(data, url) {
    if (typeof data === 'undefined' || data == null) {
        console.warn(`no data found for ${url}`);
        return [];
    }
    if (typeof data === 'object' && !Array.isArray(data)) {
        const values = Array.from(Object.values(data));
        if (values) {
            data = values.find((a) => Array.isArray(a));
        }
    }
    if (!Array.isArray(data)) {
        console.warn(`No valid data found for ${url}`);
        return [];
    }
    return data;
}
/**
 * Async generator function that retrieves paged data from a Canvas API endpoint.
 * It sends HTTP GET requests to the provided URL, processes the results, and iterates
 * through all pages of data, yielding each individual item.
 *
 * The generator automatically handles pagination by examining the 'Link' header
 * returned in each response and fetching the next page as long as a 'next' link is available.
 *
 * @template T - A generic type parameter extending CanvasData to represent the structure of the data.
 * @param {string} url - The full URL for the API request. If the `queryParams` option is provided in the config, it appends the query parameters to the URL.
 * @param {ICanvasCallConfig | null} [config=null] - Optional configuration object for the request, including query parameters and additional fetch options like headers.
 * @yields {T} - Yields individual items of the retrieved data from each page, one at a time.
 *
 * @throws {Error} - If the request fails or the URL contains "undefined", a warning is logged to the console.
 *
 * @example
 * ```
 * const generator = getPagedDataGenerator<MyDataType>('https://canvas.example.com/api/data', config);
 * for await (const item of generator) {
 *     console.log(item);  // Handle each item individually
 * }
 * ```
 */
async function* getPagedDataGenerator(url, config = null) {
    if (config?.queryParams) {
        url += '?' + (0, canvasUtils_1.searchParamsFromObject)(config.queryParams);
    }
    if (url.includes('undefined')) {
        console.warn(url);
    }
    /* Returns a list of data from a GET request, going through multiple pages of data requests as necessary */
    let response = await fetch(url, config?.fetchInit);
    const data = handleResponseData(await response.json(), url);
    if (data.length === 0)
        return data;
    for (const value of data)
        yield value;
    let next_page_link = "!";
    while (next_page_link.length !== 0 &&
        response &&
        response.ok) {
        const nextLink = getNextLink(response);
        if (!nextLink)
            break;
        next_page_link = nextLink.split(";")[0].split("<")[1].split(">")[0];
        response = await fetch(next_page_link, config?.fetchInit);
        const responseData = handleResponseData(await response.json(), url);
        for (const value of responseData) {
            value.retrieved_at = new Date().toISOString();
            yield value;
        }
    }
}
function getNextLink(response) {
    const link = response.headers.get("Link");
    if (!link)
        return null;
    const paginationLinks = link.split(",");
    return paginationLinks.find((link) => link.includes('next'));
}
//# sourceMappingURL=getPagedDataGenerator.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js"
/*!**********************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/fetch/utils.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overrideConfig = overrideConfig;
exports.fetchGetConfig = fetchGetConfig;
const canvasUtils_1 = __webpack_require__(/*! ../canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
function overrideConfig(source, override) {
    return (0, canvasUtils_1.deepObjectMerge)(source, override) ?? {};
}
function fetchGetConfig(options, baseConfig) {
    return overrideConfig(baseConfig, {
        queryParams: options,
    });
}
//# sourceMappingURL=utils.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/profile.js"
/*!******************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/profile.js ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFacultyPages = getFacultyPages;
exports.getProfileFromPage = getProfileFromPage;
exports.frontPageBio = frontPageBio;
exports.renderProfileIntoCurioFrontPage = renderProfileIntoCurioFrontPage;
exports.getPotentialFacultyProfiles = getPotentialFacultyProfiles;
exports.getCurioPageFrontPageProfile = getCurioPageFrontPageProfile;
exports.winnow = winnow;
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const canvasUtils_1 = __webpack_require__(/*! ./canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
const Account_1 = __webpack_require__(/*! ./Account */ "./node_modules/@ueu/ueu-canvas/dist/Account.js");
const toolbox_1 = __webpack_require__(/*! ./course/toolbox */ "./node_modules/@ueu/ueu-canvas/dist/course/toolbox.js");
let facultyCourseCached;
async function getFacultyCourse() {
    const facultyCourse = facultyCourseCached ?? await (0, toolbox_1.getSingleCourse)('Faculty Bios', (await Account_1.Account.getAll()).map(a => a.id));
    facultyCourseCached = facultyCourse;
    (0, assert_1.default)(facultyCourse);
    return facultyCourse;
}
async function getFacultyPages(searchTerm) {
    const facultyCourse = await getFacultyCourse();
    return await facultyCourse.getPages({
        queryParams: {
            include: ['body'],
            search_term: searchTerm
        }
    });
}
async function getPotentialFacultyProfiles(user) {
    let pages = [];
    const [lastName, firstName] = user.name.split(' ');
    for (const query of [
        user.name,
        lastName,
        firstName,
    ]) {
        console.log(query);
        pages = await getFacultyPages(query);
        if (pages.length > 0)
            break;
    }
    const profiles = pages.map((page) => getProfileFromPage(page, user), true);
    if (profiles.length > 0) {
        for (const profile of profiles) {
            profile.displayName ??= user.name;
        }
    }
    return profiles;
}
function getProfileFromPage(page, user) {
    const profile = getProfileFromPageHtml(page.body, user);
    profile.sourcePage = page;
    return profile;
}
function getProfileFromPageHtml(html, user) {
    const el = document.createElement('div');
    el.innerHTML = html;
    const displayName = getDisplayName(el);
    const body = getProfileBody(el);
    const image = getImageLink(el);
    return {
        user,
        bio: body,
        displayName,
        image,
        imageLink: image?.src,
    };
}
function getProfileBody(el) {
    const h4s = el.querySelectorAll('h4');
    const instructorHeaders = Array.from(h4s).filter((el) => {
        return el.innerHTML.search(/instructor/i);
    });
    let potentials = [];
    for (const header of instructorHeaders) {
        const potentialParent = header.parentElement;
        if (potentialParent) {
            header.remove();
            potentials.push(potentialParent.innerHTML);
        }
    }
    potentials = winnow(potentials, [
        (potential) => potential.length > 0,
    ]);
    /* just guess if we can't find anything */
    if (potentials.length > 0) {
        return potentials[0];
    }
    return null;
}
function getDisplayName(el) {
    let titles = Array.from(el.querySelectorAll('strong em'));
    if (titles.length === 0) {
        const enclosedImages = Array.from(el.querySelectorAll('p img'));
        titles = enclosedImages.map((el) => (0, canvasUtils_1.parentElement)(el, 'p')?.nextElementSibling)
            .filter((el) => el instanceof Element);
    }
    if (titles.length === 0) {
        const headings = Array.from(el.querySelectorAll('p strong'));
        const instructorHeaders = headings.filter(el => el.innerHTML.search(/Instructor/));
        titles = instructorHeaders.map((el) => el.previousElementSibling)
            .filter((el) => el instanceof Element);
    }
    titles = titles.filter((title) => title.textContent && title.textContent.length > 0);
    if (titles.length > 0)
        return titles[0].textContent;
    return null;
}
/**
 * Finds all the image links in the content and returns the biggest.
 * @param el
 */
function getImageLink(el) {
    const imgs = el.querySelectorAll('img');
    if (imgs.length === 0)
        return null;
    return Array.from(imgs)[1];
}
/**
 * Takes in a list of parameters and a set of filter functions. Runs filter functions until there are one or fewer elements,
 * or it runs out of filter functions. Returns post-filtered list.
 * @param originalList The list of items to run
 * @param winnowFuncs A list of filter functions, run in order
 * @param returnLastNonEmpty If true, will return the last non-empty array found if elements are winnowed to 0
 */
function winnow(originalList, winnowFuncs, returnLastNonEmpty = false) {
    let copyList = [...originalList];
    if (copyList.length === 1)
        return copyList; //already at 1 element
    let lastSet = [...copyList];
    for (const winnowFunc of winnowFuncs) {
        lastSet = [...copyList];
        copyList = copyList.filter(winnowFunc);
        if (copyList.length === 1)
            break;
    }
    if (copyList.length === 0 && returnLastNonEmpty)
        return lastSet;
    return copyList;
}
function getCurioPageFrontPageProfile(html, user) {
    const el = document.createElement('div');
    el.innerHTML = html;
    try {
        const header = getCurioHeader(el);
        const match = header.innerHTML.match(/Meet your instructor, ?(.*)!/i);
        const displayName = match ? match[1] : null;
        const bio = getCurioBio(el);
        const image = getCurioProfileImage(el);
        return {
            user,
            displayName,
            image,
            imageLink: image ? image.src : null,
            bio: bio?.innerHTML
        };
    }
    catch (e) {
        return {
            user,
            displayName: "CANNOT LOCATE PROFILE",
            bio: e.toString(),
        };
    }
}
function frontPageBio(profile) {
    return profile.bio + `<p>${profile.displayName} should be contacted during the term using Canvas Inbox,
 but can be reached after and before the term via their email address: ${profile.user.email}</p>`;
}
function renderProfileIntoCurioFrontPage(html, profile) {
    const el = document.createElement('div');
    el.innerHTML = html;
    if (profile.displayName) {
        const header = getCurioHeader(el);
        header.innerHTML = `Meet your instructor, ${profile.displayName}!`;
    }
    if (profile.bio) {
        const bio = getCurioBio(el);
        if (bio) {
            const classes = bio.classList;
            if (!classes.contains('cbt-instructor-bio'))
                classes.add('cbt-instructor-bio');
            bio.innerHTML = frontPageBio(profile);
        }
    }
    if (profile.image) {
        const image = getCurioProfileImage(el);
        if (image) {
            image.src = profile.image.src;
            image.alt = profile.image.alt;
        }
    }
    else if (profile.imageLink) {
        const image = getCurioProfileImage(el);
        if (image) {
            image.src = profile.imageLink;
        }
    }
    return el.innerHTML;
}
function getCurioHeader(el) {
    let h2s = Array.from(el.querySelectorAll('h2'));
    h2s = h2s.filter((h2) => h2.innerHTML.match(/Meet your instructor/i));
    if (h2s.length <= 0)
        throw new Error(`Can't find bio section of front page.\n${h2s.map(a => a.innerHTML)}\n${el.innerHTML}`);
    return h2s[0];
}
function getCurioProfileDiv(el) {
    const header = getCurioHeader(el);
    const sectionEl = header.nextElementSibling;
    (0, assert_1.default)(sectionEl, "Body element of bio not found on page.");
    return sectionEl;
}
function getCurioBio(el) {
    const profileDiv = getCurioProfileDiv(el);
    const bio = profileDiv.querySelector('.cbt-instructor-bio');
    if (bio && bio.innerHTML)
        return bio;
    const div = getCurioProfileDiv(el);
    const p = div.querySelector('p');
    return p?.parentElement;
}
function getCurioProfileImage(el) {
    return getCurioProfileDiv(el).querySelector('img');
}
//# sourceMappingURL=profile.js.map

/***/ },

/***/ "./node_modules/@ueu/ueu-canvas/dist/term/Term.js"
/*!********************************************************!*\
  !*** ./node_modules/@ueu/ueu-canvas/dist/term/Term.js ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Term = void 0;
const baseCanvasObject_1 = __webpack_require__(/*! ../baseCanvasObject */ "./node_modules/@ueu/ueu-canvas/dist/baseCanvasObject.js");
const Account_1 = __webpack_require__(/*! ../Account */ "./node_modules/@ueu/ueu-canvas/dist/Account.js");
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js"));
const getPagedDataGenerator_1 = __webpack_require__(/*! ../fetch/getPagedDataGenerator */ "./node_modules/@ueu/ueu-canvas/dist/fetch/getPagedDataGenerator.js");
const fetchJson_1 = __webpack_require__(/*! ../fetch/fetchJson */ "./node_modules/@ueu/ueu-canvas/dist/fetch/fetchJson.js");
class Term extends baseCanvasObject_1.BaseCanvasObject {
    static nameProperty = "name";
    static async getTerm(code, workflowState = 'all', config = undefined) {
        const terms = await this.searchTerms(code, workflowState, config);
        if (!Array.isArray(terms) || terms.length <= 0) {
            return null;
        }
        return terms[0];
    }
    static async getTermById(termId, config = null) {
        const account = await Account_1.Account.getRootAccount();
        if (!account)
            throw new Account_1.RootAccountNotFoundError();
        const url = `/api/v1/accounts/${account.id}/terms/${termId}`;
        const termData = await (0, fetchJson_1.fetchJson)(url, config);
        if (termData)
            return new Term(termData);
        return null;
    }
    static async getAllActiveTerms(config = null) {
        return await this.searchTerms(null, 'active', config);
    }
    static async searchTerms(code = null, workflowState = 'all', config = null) {
        config = config || {};
        config.queryParams = config.queryParams || {};
        const queryParams = config.queryParams;
        if (workflowState)
            queryParams['workflow_state'] = workflowState;
        if (code)
            queryParams['term_name'] = code;
        const rootAccount = await Account_1.Account.getRootAccount();
        (0, assert_1.default)(rootAccount);
        const url = `/api/v1/accounts/${rootAccount.id}/terms`;
        const data = await (0, getPagedDataGenerator_1.getPagedData)(url, config);
        const terms = [];
        for (const datum of data) {
            if (datum.hasOwnProperty('enrollment_terms')) {
                for (const termData of datum['enrollment_terms']) {
                    terms.push(termData);
                }
            }
            else {
                terms.push(datum);
            }
        }
        if (!terms || terms.length === 0) {
            return null;
        }
        return terms.map(term => new Term(term));
    }
}
exports.Term = Term;
//# sourceMappingURL=Term.js.map

/***/ },

/***/ "./node_modules/assert/build/assert.js"
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");
var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(/*! object.assign/polyfill */ "./node_modules/object.assign/polyfill.js")();
var objectIs = __webpack_require__(/*! object-is/polyfill */ "./node_modules/object-is/polyfill.js")();
var RegExpPrototypeTest = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js")('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ },

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js"
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require.inspect;
var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ },

/***/ "./node_modules/assert/build/internal/errors.js"
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ },

/***/ "./node_modules/assert/build/internal/util/comparisons.js"
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ },

/***/ "./node_modules/call-bind-apply-helpers/actualApply.js"
/*!*************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/actualApply.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

var $apply = __webpack_require__(/*! ./functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! ./functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");
var $reflectApply = __webpack_require__(/*! ./reflectApply */ "./node_modules/call-bind-apply-helpers/reflectApply.js");

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);


/***/ },

/***/ "./node_modules/call-bind-apply-helpers/applyBind.js"
/*!***********************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/applyBind.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var $apply = __webpack_require__(/*! ./functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var actualApply = __webpack_require__(/*! ./actualApply */ "./node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
};


/***/ },

/***/ "./node_modules/call-bind-apply-helpers/functionApply.js"
/*!***************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/functionApply.js ***!
  \***************************************************************/
(module) {

"use strict";


/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;


/***/ },

/***/ "./node_modules/call-bind-apply-helpers/functionCall.js"
/*!**************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/functionCall.js ***!
  \**************************************************************/
(module) {

"use strict";


/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;


/***/ },

/***/ "./node_modules/call-bind-apply-helpers/index.js"
/*!*******************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/index.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var $call = __webpack_require__(/*! ./functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");
var $actualApply = __webpack_require__(/*! ./actualApply */ "./node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};


/***/ },

/***/ "./node_modules/call-bind-apply-helpers/reflectApply.js"
/*!**************************************************************!*\
  !*** ./node_modules/call-bind-apply-helpers/reflectApply.js ***!
  \**************************************************************/
(module) {

"use strict";


/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;


/***/ },

/***/ "./node_modules/call-bind/callBound.js"
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ },

/***/ "./node_modules/call-bind/index.js"
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var setFunctionLength = __webpack_require__(/*! set-function-length */ "./node_modules/set-function-length/index.js");

var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");
var applyBind = __webpack_require__(/*! call-bind-apply-helpers/applyBind */ "./node_modules/call-bind-apply-helpers/applyBind.js");

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ },

/***/ "./node_modules/call-bound/index.js"
/*!******************************************!*\
  !*** ./node_modules/call-bound/index.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	/* eslint no-extra-parens: 0 */

	var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic(/** @type {const} */ ([intrinsic]));
	}
	return intrinsic;
};


/***/ },

/***/ "./node_modules/define-data-property/index.js"
/*!****************************************************!*\
  !*** ./node_modules/define-data-property/index.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

var gopd = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ },

/***/ "./node_modules/define-properties/index.js"
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ },

/***/ "./node_modules/dunder-proto/get.js"
/*!******************************************!*\
  !*** ./node_modules/dunder-proto/get.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var callBind = __webpack_require__(/*! call-bind-apply-helpers */ "./node_modules/call-bind-apply-helpers/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;


/***/ },

/***/ "./node_modules/es-define-property/index.js"
/*!**************************************************!*\
  !*** ./node_modules/es-define-property/index.js ***!
  \**************************************************/
(module) {

"use strict";


/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ },

/***/ "./node_modules/es-errors/eval.js"
/*!****************************************!*\
  !*** ./node_modules/es-errors/eval.js ***!
  \****************************************/
(module) {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ },

/***/ "./node_modules/es-errors/index.js"
/*!*****************************************!*\
  !*** ./node_modules/es-errors/index.js ***!
  \*****************************************/
(module) {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ },

/***/ "./node_modules/es-errors/range.js"
/*!*****************************************!*\
  !*** ./node_modules/es-errors/range.js ***!
  \*****************************************/
(module) {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ },

/***/ "./node_modules/es-errors/ref.js"
/*!***************************************!*\
  !*** ./node_modules/es-errors/ref.js ***!
  \***************************************/
(module) {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ },

/***/ "./node_modules/es-errors/syntax.js"
/*!******************************************!*\
  !*** ./node_modules/es-errors/syntax.js ***!
  \******************************************/
(module) {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ },

/***/ "./node_modules/es-errors/type.js"
/*!****************************************!*\
  !*** ./node_modules/es-errors/type.js ***!
  \****************************************/
(module) {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ },

/***/ "./node_modules/es-errors/uri.js"
/*!***************************************!*\
  !*** ./node_modules/es-errors/uri.js ***!
  \***************************************/
(module) {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ },

/***/ "./node_modules/es-object-atoms/index.js"
/*!***********************************************!*\
  !*** ./node_modules/es-object-atoms/index.js ***!
  \***********************************************/
(module) {

"use strict";


/** @type {import('.')} */
module.exports = Object;


/***/ },

/***/ "./node_modules/for-each/index.js"
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

/** @type {(x: unknown) => x is readonly unknown[]} */
function isArray(x) {
    return toStr.call(x) === '[object Array]';
}

/** @type {import('.')._internal} */
module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};


/***/ },

/***/ "./node_modules/function-bind/implementation.js"
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
(module) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ },

/***/ "./node_modules/function-bind/index.js"
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ },

/***/ "./node_modules/generator-function/index.js"
/*!**************************************************!*\
  !*** ./node_modules/generator-function/index.js ***!
  \**************************************************/
(module) {

"use strict";


// eslint-disable-next-line no-extra-parens, no-empty-function
const cached = /** @type {GeneratorFunctionConstructor} */ (function* () {}.constructor);

/** @type {import('.')} */
module.exports = () => cached;



/***/ },

/***/ "./node_modules/get-intrinsic/index.js"
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var undefined;

var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");

var $Error = __webpack_require__(/*! es-errors */ "./node_modules/es-errors/index.js");
var $EvalError = __webpack_require__(/*! es-errors/eval */ "./node_modules/es-errors/eval.js");
var $RangeError = __webpack_require__(/*! es-errors/range */ "./node_modules/es-errors/range.js");
var $ReferenceError = __webpack_require__(/*! es-errors/ref */ "./node_modules/es-errors/ref.js");
var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "./node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $URIError = __webpack_require__(/*! es-errors/uri */ "./node_modules/es-errors/uri.js");

var abs = __webpack_require__(/*! math-intrinsics/abs */ "./node_modules/math-intrinsics/abs.js");
var floor = __webpack_require__(/*! math-intrinsics/floor */ "./node_modules/math-intrinsics/floor.js");
var max = __webpack_require__(/*! math-intrinsics/max */ "./node_modules/math-intrinsics/max.js");
var min = __webpack_require__(/*! math-intrinsics/min */ "./node_modules/math-intrinsics/min.js");
var pow = __webpack_require__(/*! math-intrinsics/pow */ "./node_modules/math-intrinsics/pow.js");
var round = __webpack_require__(/*! math-intrinsics/round */ "./node_modules/math-intrinsics/round.js");
var sign = __webpack_require__(/*! math-intrinsics/sign */ "./node_modules/math-intrinsics/sign.js");

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");
var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");
var $ObjectGPO = __webpack_require__(/*! get-proto/Object.getPrototypeOf */ "./node_modules/get-proto/Object.getPrototypeOf.js");
var $ReflectGPO = __webpack_require__(/*! get-proto/Reflect.getPrototypeOf */ "./node_modules/get-proto/Reflect.getPrototypeOf.js");

var $apply = __webpack_require__(/*! call-bind-apply-helpers/functionApply */ "./node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! call-bind-apply-helpers/functionCall */ "./node_modules/call-bind-apply-helpers/functionCall.js");

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Object.getPrototypeOf%': $ObjectGPO,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow,
	'%Math.round%': round,
	'%Math.sign%': sign,
	'%Reflect.getPrototypeOf%': $ReflectGPO
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ },

/***/ "./node_modules/get-proto/Object.getPrototypeOf.js"
/*!*********************************************************!*\
  !*** ./node_modules/get-proto/Object.getPrototypeOf.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");

/** @type {import('./Object.getPrototypeOf')} */
module.exports = $Object.getPrototypeOf || null;


/***/ },

/***/ "./node_modules/get-proto/Reflect.getPrototypeOf.js"
/*!**********************************************************!*\
  !*** ./node_modules/get-proto/Reflect.getPrototypeOf.js ***!
  \**********************************************************/
(module) {

"use strict";


/** @type {import('./Reflect.getPrototypeOf')} */
module.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;


/***/ },

/***/ "./node_modules/get-proto/index.js"
/*!*****************************************!*\
  !*** ./node_modules/get-proto/index.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var reflectGetProto = __webpack_require__(/*! ./Reflect.getPrototypeOf */ "./node_modules/get-proto/Reflect.getPrototypeOf.js");
var originalGetProto = __webpack_require__(/*! ./Object.getPrototypeOf */ "./node_modules/get-proto/Object.getPrototypeOf.js");

var getDunderProto = __webpack_require__(/*! dunder-proto/get */ "./node_modules/dunder-proto/get.js");

/** @type {import('.')} */
module.exports = reflectGetProto
	? function getProto(O) {
		// @ts-expect-error TS can't narrow inside a closure, for some reason
		return reflectGetProto(O);
	}
	: originalGetProto
		? function getProto(O) {
			if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
				throw new TypeError('getProto: not an object');
			}
			// @ts-expect-error TS can't narrow inside a closure, for some reason
			return originalGetProto(O);
		}
		: getDunderProto
			? function getProto(O) {
				// @ts-expect-error TS can't narrow inside a closure, for some reason
				return getDunderProto(O);
			}
			: null;


/***/ },

/***/ "./node_modules/gopd/gOPD.js"
/*!***********************************!*\
  !*** ./node_modules/gopd/gOPD.js ***!
  \***********************************/
(module) {

"use strict";


/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;


/***/ },

/***/ "./node_modules/gopd/index.js"
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/** @type {import('.')} */
var $gOPD = __webpack_require__(/*! ./gOPD */ "./node_modules/gopd/gOPD.js");

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ },

/***/ "./node_modules/has-property-descriptors/index.js"
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "./node_modules/es-define-property/index.js");

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ },

/***/ "./node_modules/has-symbols/index.js"
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ },

/***/ "./node_modules/has-symbols/shams.js"
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
(module) {

"use strict";


/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ },

/***/ "./node_modules/has-tostringtag/shams.js"
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ },

/***/ "./node_modules/hasown/index.js"
/*!**************************************!*\
  !*** ./node_modules/hasown/index.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ },

/***/ "./node_modules/inherits/inherits_browser.js"
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
(module) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ },

/***/ "./node_modules/is-arguments/index.js"
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ },

/***/ "./node_modules/is-callable/index.js"
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
(module) {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ },

/***/ "./node_modules/is-generator-function/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var safeRegexTest = __webpack_require__(/*! safe-regex-test */ "./node_modules/safe-regex-test/index.js");
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");

var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');

var getGeneratorFunction = __webpack_require__(/*! generator-function */ "./node_modules/generator-function/index.js");

/** @type {import('.')} */
module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex(fnToStr(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	var GeneratorFunction = getGeneratorFunction();
	return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
};


/***/ },

/***/ "./node_modules/is-nan/implementation.js"
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
(module) {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ },

/***/ "./node_modules/is-nan/index.js"
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ },

/***/ "./node_modules/is-nan/polyfill.js"
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ },

/***/ "./node_modules/is-nan/shim.js"
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ },

/***/ "./node_modules/is-regex/index.js"
/*!****************************************!*\
  !*** ./node_modules/is-regex/index.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {import('.')} */
var fn;

if (hasToStringTag) {
	/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
	var $exec = callBound('RegExp.prototype.exec');
	/** @type {object} */
	var isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
	var badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}

	/** @type {import('.')} */
	// @ts-expect-error TS can't figure out that the $exec call always throws
	// eslint-disable-next-line consistent-return
	fn = function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {NonNullable<typeof gOPD>} */ (gOPD)(/** @type {{ lastIndex?: unknown }} */ (value), 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			// eslint-disable-next-line no-extra-parens
			$exec(value, /** @type {string} */ (/** @type {unknown} */ (badStringifier)));
		} catch (e) {
			return e === isRegexMarker;
		}
	};
} else {
	/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
	var $toString = callBound('Object.prototype.toString');
	/** @const @type {'[object RegExp]'} */
	var regexClass = '[object RegExp]';

	/** @type {import('.')} */
	fn = function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};
}

module.exports = fn;


/***/ },

/***/ "./node_modules/is-typed-array/index.js"
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ },

/***/ "./node_modules/math-intrinsics/abs.js"
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/abs.js ***!
  \*********************************************/
(module) {

"use strict";


/** @type {import('./abs')} */
module.exports = Math.abs;


/***/ },

/***/ "./node_modules/math-intrinsics/floor.js"
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/floor.js ***!
  \***********************************************/
(module) {

"use strict";


/** @type {import('./floor')} */
module.exports = Math.floor;


/***/ },

/***/ "./node_modules/math-intrinsics/isNaN.js"
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/isNaN.js ***!
  \***********************************************/
(module) {

"use strict";


/** @type {import('./isNaN')} */
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ },

/***/ "./node_modules/math-intrinsics/max.js"
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/max.js ***!
  \*********************************************/
(module) {

"use strict";


/** @type {import('./max')} */
module.exports = Math.max;


/***/ },

/***/ "./node_modules/math-intrinsics/min.js"
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/min.js ***!
  \*********************************************/
(module) {

"use strict";


/** @type {import('./min')} */
module.exports = Math.min;


/***/ },

/***/ "./node_modules/math-intrinsics/pow.js"
/*!*********************************************!*\
  !*** ./node_modules/math-intrinsics/pow.js ***!
  \*********************************************/
(module) {

"use strict";


/** @type {import('./pow')} */
module.exports = Math.pow;


/***/ },

/***/ "./node_modules/math-intrinsics/round.js"
/*!***********************************************!*\
  !*** ./node_modules/math-intrinsics/round.js ***!
  \***********************************************/
(module) {

"use strict";


/** @type {import('./round')} */
module.exports = Math.round;


/***/ },

/***/ "./node_modules/math-intrinsics/sign.js"
/*!**********************************************!*\
  !*** ./node_modules/math-intrinsics/sign.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var $isNaN = __webpack_require__(/*! ./isNaN */ "./node_modules/math-intrinsics/isNaN.js");

/** @type {import('./sign')} */
module.exports = function sign(number) {
	if ($isNaN(number) || number === 0) {
		return number;
	}
	return number < 0 ? -1 : +1;
};


/***/ },

/***/ "./node_modules/object-is/implementation.js"
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
(module) {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ },

/***/ "./node_modules/object-is/index.js"
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ },

/***/ "./node_modules/object-is/polyfill.js"
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ },

/***/ "./node_modules/object-is/shim.js"
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ },

/***/ "./node_modules/object-keys/implementation.js"
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ },

/***/ "./node_modules/object-keys/index.js"
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ },

/***/ "./node_modules/object-keys/isArguments.js"
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
(module) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ },

/***/ "./node_modules/object.assign/implementation.js"
/*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var $Object = __webpack_require__(/*! es-object-atoms */ "./node_modules/es-object-atoms/index.js");
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = $Object(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = $Object(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ },

/***/ "./node_modules/object.assign/polyfill.js"
/*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.assign/implementation.js");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ },

/***/ "./node_modules/possible-typed-array-names/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/possible-typed-array-names/index.js ***!
  \**********************************************************/
(module) {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float16Array',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ },

/***/ "./node_modules/process/browser.js"
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },

/***/ "./node_modules/safe-regex-test/index.js"
/*!***********************************************!*\
  !*** ./node_modules/safe-regex-test/index.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var isRegex = __webpack_require__(/*! is-regex */ "./node_modules/is-regex/index.js");

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");

/** @type {import('.')} */
module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};


/***/ },

/***/ "./node_modules/set-function-length/index.js"
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "./node_modules/es-errors/type.js");
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ },

/***/ "./node_modules/util/support/isBufferBrowser.js"
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
(module) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ },

/***/ "./node_modules/util/support/types.js"
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ },

/***/ "./node_modules/util/util.js"
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ },

/***/ "./node_modules/which-typed-array/index.js"
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var callBound = __webpack_require__(/*! call-bound */ "./node_modules/call-bound/index.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");
var getProto = __webpack_require__(/*! get-proto */ "./node_modules/get-proto/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {import('./types').Getter} Getter */
/** @type {import('./types').Cache} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getProto) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) {
				var superProto = getProto(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			if (descriptor && descriptor.get) {
				var bound = callBind(descriptor.get);
				cache[
					/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
				] = bound;
			}
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			var bound = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */ (
				// @ts-expect-error TODO FIXME
				callBind(fn)
			);
			cache[
				/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
			] = bound;
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					if ('$' + getter(value) === typedArray) {
						found = /** @type {import('.').TypedArrayName} */ ($slice(typedArray, 1));
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */(cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					getter(value);
					found = /** @type {import('.').TypedArrayName} */ ($slice(name, 1));
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ },

/***/ "./node_modules/available-typed-arrays/index.js"
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var possibleNames = __webpack_require__(/*! possible-typed-array-names */ "./node_modules/possible-typed-array-names/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ },

/***/ "./node_modules/temporal-polyfill/chunks/classApi.cjs"
/*!************************************************************!*\
  !*** ./node_modules/temporal-polyfill/chunks/classApi.cjs ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function createSlotClass(branding, construct, getters, methods, staticMethods) {
  function Class(...args) {
    if (!(this instanceof Class)) {
      throw new TypeError(internal.invalidCallingContext);
    }
    setSlots(this, construct(...args));
  }
  function bindMethod(method, methodName) {
    return Object.defineProperties((function(...args) {
      return method.call(this, getSpecificSlots(this), ...args);
    }), internal.createNameDescriptors(methodName));
  }
  function getSpecificSlots(obj) {
    const slots = getSlots(obj);
    if (!slots || slots.branding !== branding) {
      throw new TypeError(internal.invalidCallingContext);
    }
    return slots;
  }
  return Object.defineProperties(Class.prototype, {
    ...internal.createGetterDescriptors(internal.mapProps(bindMethod, getters)),
    ...internal.createPropDescriptors(internal.mapProps(bindMethod, methods)),
    ...internal.createStringTagDescriptors("Temporal." + branding)
  }), Object.defineProperties(Class, {
    ...internal.createPropDescriptors(staticMethods),
    ...internal.createNameDescriptors(branding)
  }), [ Class, slots => {
    const instance = Object.create(Class.prototype);
    return setSlots(instance, slots), instance;
  }, getSpecificSlots ];
}

function createProtocolValidator(propNames) {
  return propNames = propNames.concat("id").sort(), obj => {
    if (!internal.hasAllPropsByName(obj, propNames)) {
      throw new TypeError(internal.invalidProtocol);
    }
    return obj;
  };
}

function rejectInvalidBag(bag) {
  if (getSlots(bag) || void 0 !== bag.calendar || void 0 !== bag.timeZone) {
    throw new TypeError(internal.invalidBag);
  }
  return bag;
}

function createCalendarFieldMethods(methodNameMap, alsoAccept) {
  const methods = {};
  for (const methodName in methodNameMap) {
    methods[methodName] = ({native: native}, dateArg) => {
      const argSlots = getSlots(dateArg) || {}, {branding: branding} = argSlots, refinedSlots = branding === internal.PlainDateBranding || alsoAccept.includes(branding) ? argSlots : toPlainDateSlots(dateArg);
      return native[methodName](refinedSlots);
    };
  }
  return methods;
}

function createCalendarGetters(methodNameMap) {
  const methods = {};
  for (const methodName in methodNameMap) {
    methods[methodName] = slots => {
      const {calendar: calendar} = slots;
      return (calendarSlot = calendar, "string" == typeof calendarSlot ? internal.createNativeStandardOps(calendarSlot) : (calendarProtocol = calendarSlot, 
      Object.assign(Object.create(adapterSimpleOps), {
        calendarProtocol: calendarProtocol
      })))[methodName](slots);
      // removed by dead control flow
 var calendarSlot, calendarProtocol; 
    };
  }
  return methods;
}

function neverValueOf() {
  throw new TypeError(internal.forbiddenValueOf);
}

function createCalendarFromSlots({calendar: calendar}) {
  return "string" == typeof calendar ? new Calendar(calendar) : calendar;
}

function toPlainMonthDaySlots(arg, options) {
  if (options = internal.copyOptions(options), internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots && slots.branding === internal.PlainMonthDayBranding) {
      return internal.refineOverflowOptions(options), slots;
    }
    const calendarMaybe = extractCalendarSlotFromBag(arg), calendar = calendarMaybe || internal.isoCalendarId;
    return internal.refinePlainMonthDayBag(createMonthDayRefineOps(calendar), !calendarMaybe, arg, options);
  }
  const res = internal.parsePlainMonthDay(internal.createNativeStandardOps, arg);
  return internal.refineOverflowOptions(options), res;
}

function getOffsetNanosecondsForAdapter(timeZoneProtocol, getOffsetNanosecondsFor, epochNano) {
  return offsetNano = getOffsetNanosecondsFor.call(timeZoneProtocol, createInstant(internal.createInstantSlots(epochNano))), 
  internal.validateTimeZoneOffset(internal.requireInteger(offsetNano));
  // removed by dead control flow
 var offsetNano; 
}

function createAdapterOps(timeZoneProtocol, adapterFuncs = timeZoneAdapters) {
  const keys = Object.keys(adapterFuncs).sort(), boundFuncs = {};
  for (const key of keys) {
    boundFuncs[key] = internal.bindArgs(adapterFuncs[key], timeZoneProtocol, internal.requireFunction(timeZoneProtocol[key]));
  }
  return boundFuncs;
}

function createTimeZoneOps(timeZoneSlot, adapterFuncs) {
  return "string" == typeof timeZoneSlot ? internal.queryNativeTimeZone(timeZoneSlot) : createAdapterOps(timeZoneSlot, adapterFuncs);
}

function createTimeZoneOffsetOps(timeZoneSlot) {
  return createTimeZoneOps(timeZoneSlot, simpleTimeZoneAdapters);
}

function toInstantSlots(arg) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots) {
      switch (slots.branding) {
       case internal.InstantBranding:
        return slots;

       case internal.ZonedDateTimeBranding:
        return internal.createInstantSlots(slots.epochNanoseconds);
      }
    }
  }
  return internal.parseInstant(arg);
}

function getImplTransition(direction, impl, instantArg) {
  const epochNano = impl.getTransition(toInstantSlots(instantArg).epochNanoseconds, direction);
  return epochNano ? createInstant(internal.createInstantSlots(epochNano)) : null;
}

function refineTimeZoneSlot(arg) {
  return internal.isObjectLike(arg) ? (getSlots(arg) || {}).timeZone || validateTimeZoneProtocol(arg) : (arg => internal.resolveTimeZoneId(internal.parseTimeZoneId(internal.requireString(arg))))(arg);
}

function toPlainTimeSlots(arg, options) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainTimeBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.createPlainTimeSlots(slots);

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainTime(createTimeZoneOffsetOps, slots);
    }
    return internal.refinePlainTimeBag(arg, options);
  }
  return internal.refineOverflowOptions(options), internal.parsePlainTime(arg);
}

function optionalToPlainTimeFields(timeArg) {
  return void 0 === timeArg ? void 0 : toPlainTimeSlots(timeArg);
}

function toPlainYearMonthSlots(arg, options) {
  if (options = internal.copyOptions(options), internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    return slots && slots.branding === internal.PlainYearMonthBranding ? (internal.refineOverflowOptions(options), 
    slots) : internal.refinePlainYearMonthBag(createYearMonthRefineOps(getCalendarSlotFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainYearMonth(internal.createNativeStandardOps, arg);
  return internal.refineOverflowOptions(options), res;
}

function toPlainDateTimeSlots(arg, options) {
  if (options = internal.copyOptions(options), internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateBranding:
      return internal.refineOverflowOptions(options), internal.createPlainDateTimeSlots({
        ...slots,
        ...internal.isoTimeFieldDefaults
      });

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainDateTime(createTimeZoneOffsetOps, slots);
    }
    return internal.refinePlainDateTimeBag(createDateRefineOps(getCalendarSlotFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainDateTime(arg);
  return internal.refineOverflowOptions(options), res;
}

function toPlainDateSlots(arg, options) {
  if (options = internal.copyOptions(options), internal.isObjectLike(arg)) {
    const slots = getSlots(arg) || {};
    switch (slots.branding) {
     case internal.PlainDateBranding:
      return internal.refineOverflowOptions(options), slots;

     case internal.PlainDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.createPlainDateSlots(slots);

     case internal.ZonedDateTimeBranding:
      return internal.refineOverflowOptions(options), internal.zonedDateTimeToPlainDate(createTimeZoneOffsetOps, slots);
    }
    return internal.refinePlainDateBag(createDateRefineOps(getCalendarSlotFromBag(arg)), arg, options);
  }
  const res = internal.parsePlainDate(arg);
  return internal.refineOverflowOptions(options), res;
}

function dayAdapter(calendarProtocol, dayMethod, isoFields) {
  return internal.requirePositiveInteger(dayMethod.call(calendarProtocol, createPlainDate(internal.createPlainDateSlots(isoFields, calendarProtocol))));
}

function createCompoundOpsCreator(adapterFuncs) {
  return calendarSlot => "string" == typeof calendarSlot ? internal.createNativeStandardOps(calendarSlot) : ((calendarProtocol, adapterFuncs) => {
    const keys = Object.keys(adapterFuncs).sort(), boundFuncs = {};
    for (const key of keys) {
      boundFuncs[key] = internal.bindArgs(adapterFuncs[key], calendarProtocol, calendarProtocol[key]);
    }
    return boundFuncs;
  })(calendarSlot, adapterFuncs);
}

function toDurationSlots(arg) {
  if (internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    return slots && slots.branding === internal.DurationBranding ? slots : internal.refineDurationBag(arg);
  }
  return internal.parseDuration(arg);
}

function refinePublicRelativeTo(relativeTo) {
  if (void 0 !== relativeTo) {
    if (internal.isObjectLike(relativeTo)) {
      const slots = getSlots(relativeTo) || {};
      switch (slots.branding) {
       case internal.ZonedDateTimeBranding:
       case internal.PlainDateBranding:
        return slots;

       case internal.PlainDateTimeBranding:
        return internal.createPlainDateSlots(slots);
      }
      const calendar = getCalendarSlotFromBag(relativeTo);
      return {
        ...internal.refineMaybeZonedDateTimeBag(refineTimeZoneSlot, createTimeZoneOps, createDateRefineOps(calendar), relativeTo),
        calendar: calendar
      };
    }
    return internal.parseRelativeToSlots(relativeTo);
  }
}

function getCalendarSlotFromBag(bag) {
  return extractCalendarSlotFromBag(bag) || internal.isoCalendarId;
}

function extractCalendarSlotFromBag(bag) {
  const {calendar: calendar} = bag;
  if (void 0 !== calendar) {
    return refineCalendarSlot(calendar);
  }
}

function refineCalendarSlot(arg) {
  return internal.isObjectLike(arg) ? (getSlots(arg) || {}).calendar || validateCalendarProtocol(arg) : (arg => internal.resolveCalendarId(internal.parseCalendarId(internal.requireString(arg))))(arg);
}

function toZonedDateTimeSlots(arg, options) {
  if (options = internal.copyOptions(options), internal.isObjectLike(arg)) {
    const slots = getSlots(arg);
    if (slots && slots.branding === internal.ZonedDateTimeBranding) {
      return internal.refineZonedFieldOptions(options), slots;
    }
    const calendarSlot = getCalendarSlotFromBag(arg);
    return internal.refineZonedDateTimeBag(refineTimeZoneSlot, createTimeZoneOps, createDateRefineOps(calendarSlot), calendarSlot, arg, options);
  }
  return internal.parseZonedDateTime(arg, options);
}

function adaptDateMethods(methods) {
  return internal.mapProps((method => slots => method(slotsToIso(slots))), methods);
}

function slotsToIso(slots) {
  return internal.zonedEpochSlotsToIso(slots, createTimeZoneOffsetOps);
}

function createFormatMethod(methodName) {
  return function(...formattables) {
    const prepFormat = internalsMap.get(this), [format, ...rawFormattables] = prepFormat(...formattables);
    return format[methodName](...rawFormattables);
  };
}

function createProxiedMethod(methodName) {
  return function(...args) {
    return internalsMap.get(this).rawFormat[methodName](...args);
  };
}

function createFormatPrepperForBranding(branding) {
  const config = classFormatConfigs[branding];
  if (!config) {
    throw new TypeError(internal.invalidFormatType(branding));
  }
  return internal.createFormatPrepper(config, internal.memoize(internal.createFormatForPrep));
}

var internal = __webpack_require__(/*! ./internal.cjs */ "./node_modules/temporal-polyfill/chunks/internal.cjs");

const classFormatConfigs = {
  Instant: internal.instantConfig,
  PlainDateTime: internal.dateTimeConfig,
  PlainDate: internal.dateConfig,
  PlainTime: internal.timeConfig,
  PlainYearMonth: internal.yearMonthConfig,
  PlainMonthDay: internal.monthDayConfig
}, prepInstantFormat = internal.createFormatPrepper(internal.instantConfig), prepZonedDateTimeFormat = internal.createFormatPrepper(internal.zonedConfig), prepPlainDateTimeFormat = internal.createFormatPrepper(internal.dateTimeConfig), prepPlainDateFormat = internal.createFormatPrepper(internal.dateConfig), prepPlainTimeFormat = internal.createFormatPrepper(internal.timeConfig), prepPlainYearMonthFormat = internal.createFormatPrepper(internal.yearMonthConfig), prepPlainMonthDayFormat = internal.createFormatPrepper(internal.monthDayConfig), yearMonthOnlyRefiners = {
  era: internal.requireStringOrUndefined,
  eraYear: internal.requireIntegerOrUndefined,
  year: internal.requireInteger,
  month: internal.requirePositiveInteger,
  daysInMonth: internal.requirePositiveInteger,
  daysInYear: internal.requirePositiveInteger,
  inLeapYear: internal.requireBoolean,
  monthsInYear: internal.requirePositiveInteger
}, monthOnlyRefiners = {
  monthCode: internal.requireString
}, dayOnlyRefiners = {
  day: internal.requirePositiveInteger
}, dateOnlyRefiners = {
  dayOfWeek: internal.requirePositiveInteger,
  dayOfYear: internal.requirePositiveInteger,
  weekOfYear: internal.requirePositiveIntegerOrUndefined,
  yearOfWeek: internal.requireIntegerOrUndefined,
  daysInWeek: internal.requirePositiveInteger
}, dateRefiners = {
  ...yearMonthOnlyRefiners,
  ...monthOnlyRefiners,
  ...dayOnlyRefiners,
  ...dateOnlyRefiners
}, slotsMap = new WeakMap, getSlots = slotsMap.get.bind(slotsMap), setSlots = slotsMap.set.bind(slotsMap), calendarFieldMethods = {
  ...createCalendarFieldMethods(yearMonthOnlyRefiners, [ internal.PlainYearMonthBranding ]),
  ...createCalendarFieldMethods(dateOnlyRefiners, []),
  ...createCalendarFieldMethods(monthOnlyRefiners, [ internal.PlainYearMonthBranding, internal.PlainMonthDayBranding ]),
  ...createCalendarFieldMethods(dayOnlyRefiners, [ internal.PlainMonthDayBranding ])
}, dateGetters = createCalendarGetters(dateRefiners), yearMonthGetters = createCalendarGetters({
  ...yearMonthOnlyRefiners,
  ...monthOnlyRefiners
}), monthDayGetters = createCalendarGetters({
  ...monthOnlyRefiners,
  ...dayOnlyRefiners
}), calendarIdGetters = {
  calendarId: slots => internal.getId(slots.calendar)
}, adapterSimpleOps = internal.mapProps(((refiner, methodName) => function(isoFields) {
  const {calendarProtocol: calendarProtocol} = this;
  return refiner(calendarProtocol[methodName](createPlainDate(internal.createPlainDateSlots(isoFields, calendarProtocol))));
}), dateRefiners), durationGetters = internal.mapPropNames((propName => slots => slots[propName]), internal.durationFieldNamesAsc.concat("sign")), timeGetters = internal.mapPropNames(((_name, i) => slots => slots[internal.isoTimeFieldNamesAsc[i]]), internal.timeFieldNamesAsc), epochGetters = {
  epochSeconds: internal.getEpochSec,
  epochMilliseconds: internal.getEpochMilli,
  epochMicroseconds: internal.getEpochMicro,
  epochNanoseconds: internal.getEpochNano
}, removeBranding = internal.bindArgs(internal.excludePropsByName, new Set([ "branding" ])), [PlainMonthDay, createPlainMonthDay, getPlainMonthDaySlots] = createSlotClass(internal.PlainMonthDayBranding, internal.bindArgs(internal.constructPlainMonthDaySlots, refineCalendarSlot), {
  ...calendarIdGetters,
  ...monthDayGetters
}, {
  getISOFields: removeBranding,
  getCalendar: createCalendarFromSlots,
  with(slots, mod, options) {
    return createPlainMonthDay(internal.plainMonthDayWithFields(createMonthDayModOps, slots, this, rejectInvalidBag(mod), options));
  },
  equals: (slots, otherArg) => internal.plainMonthDaysEqual(slots, toPlainMonthDaySlots(otherArg)),
  toPlainDate(slots, bag) {
    return createPlainDate(internal.plainMonthDayToPlainDate(createDateModOps, slots, this, bag));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainMonthDayFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainMonthDayIso,
  toJSON: slots => internal.formatPlainMonthDayIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainMonthDay(toPlainMonthDaySlots(arg, options))
}), timeZoneAdapters = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
  getPossibleInstantsFor(timeZoneProtocol, getPossibleInstantsFor, isoFields) {
    const epochNanos = [ ...getPossibleInstantsFor.call(timeZoneProtocol, createPlainDateTime(internal.createPlainDateTimeSlots(isoFields, internal.isoCalendarId))) ].map((instant => getInstantSlots(instant).epochNanoseconds)), epochNanoLen = epochNanos.length;
    return epochNanoLen > 1 && (epochNanos.sort(internal.compareBigNanos), internal.validateTimeZoneGap(internal.bigNanoToNumber(internal.diffBigNanos(epochNanos[0], epochNanos[epochNanoLen - 1])))), 
    epochNanos;
  }
}, simpleTimeZoneAdapters = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter
}, [Instant, createInstant, getInstantSlots] = createSlotClass(internal.InstantBranding, internal.constructInstantSlots, epochGetters, {
  add: (slots, durationArg) => createInstant(internal.moveInstant(0, slots, toDurationSlots(durationArg))),
  subtract: (slots, durationArg) => createInstant(internal.moveInstant(1, slots, toDurationSlots(durationArg))),
  until: (slots, otherArg, options) => createDuration(internal.diffInstants(0, slots, toInstantSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffInstants(1, slots, toInstantSlots(otherArg), options)),
  round: (slots, options) => createInstant(internal.roundInstant(slots, options)),
  equals: (slots, otherArg) => internal.instantsEqual(slots, toInstantSlots(otherArg)),
  toZonedDateTime(slots, options) {
    const refinedObj = internal.requireObjectLike(options);
    return createZonedDateTime(internal.instantToZonedDateTime(slots, refineTimeZoneSlot(refinedObj.timeZone), refineCalendarSlot(refinedObj.calendar)));
  },
  toZonedDateTimeISO: (slots, timeZoneArg) => createZonedDateTime(internal.instantToZonedDateTime(slots, refineTimeZoneSlot(timeZoneArg))),
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepInstantFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: (slots, options) => internal.formatInstantIso(refineTimeZoneSlot, createTimeZoneOffsetOps, slots, options),
  toJSON: slots => internal.formatInstantIso(refineTimeZoneSlot, createTimeZoneOffsetOps, slots),
  valueOf: neverValueOf
}, {
  from: arg => createInstant(toInstantSlots(arg)),
  fromEpochSeconds: epochSec => createInstant(internal.epochSecToInstant(epochSec)),
  fromEpochMilliseconds: epochMilli => createInstant(internal.epochMilliToInstant(epochMilli)),
  fromEpochMicroseconds: epochMicro => createInstant(internal.epochMicroToInstant(epochMicro)),
  fromEpochNanoseconds: epochNano => createInstant(internal.epochNanoToInstant(epochNano)),
  compare: (a, b) => internal.compareInstants(toInstantSlots(a), toInstantSlots(b))
}), [TimeZone, createTimeZone] = createSlotClass("TimeZone", (id => {
  const slotId = internal.refineTimeZoneId(id);
  return {
    branding: "TimeZone",
    id: slotId,
    native: internal.queryNativeTimeZone(slotId)
  };
}), {
  id: slots => slots.id
}, {
  getPossibleInstantsFor: ({native: native}, plainDateTimeArg) => native.getPossibleInstantsFor(toPlainDateTimeSlots(plainDateTimeArg)).map((epochNano => createInstant(internal.createInstantSlots(epochNano)))),
  getOffsetNanosecondsFor: ({native: native}, instantArg) => native.getOffsetNanosecondsFor(toInstantSlots(instantArg).epochNanoseconds),
  getOffsetStringFor(_slots, instantArg) {
    const epochNano = toInstantSlots(instantArg).epochNanoseconds, offsetNano = createAdapterOps(this, simpleTimeZoneAdapters).getOffsetNanosecondsFor(epochNano);
    return internal.formatOffsetNano(offsetNano);
  },
  getPlainDateTimeFor(_slots, instantArg, calendarArg = internal.isoCalendarId) {
    const epochNano = toInstantSlots(instantArg).epochNanoseconds, offsetNano = createAdapterOps(this, simpleTimeZoneAdapters).getOffsetNanosecondsFor(epochNano);
    return createPlainDateTime(internal.createPlainDateTimeSlots(internal.epochNanoToIso(epochNano, offsetNano), refineCalendarSlot(calendarArg)));
  },
  getInstantFor(_slots, plainDateTimeArg, options) {
    const isoFields = toPlainDateTimeSlots(plainDateTimeArg), epochDisambig = internal.refineEpochDisambigOptions(options), calendarOps = createAdapterOps(this);
    return createInstant(internal.createInstantSlots(internal.getSingleInstantFor(calendarOps, isoFields, epochDisambig)));
  },
  getNextTransition: ({native: native}, instantArg) => getImplTransition(1, native, instantArg),
  getPreviousTransition: ({native: native}, instantArg) => getImplTransition(-1, native, instantArg),
  equals(_slots, otherArg) {
    return !!internal.isTimeZoneSlotsEqual(this, refineTimeZoneSlot(otherArg));
  },
  toString: slots => slots.id,
  toJSON: slots => slots.id
}, {
  from(arg) {
    const timeZoneSlot = refineTimeZoneSlot(arg);
    return "string" == typeof timeZoneSlot ? new TimeZone(timeZoneSlot) : timeZoneSlot;
  }
}), validateTimeZoneProtocol = createProtocolValidator(Object.keys(timeZoneAdapters)), [PlainTime, createPlainTime] = createSlotClass(internal.PlainTimeBranding, internal.constructPlainTimeSlots, timeGetters, {
  getISOFields: removeBranding,
  with(_slots, mod, options) {
    return createPlainTime(internal.plainTimeWithFields(this, rejectInvalidBag(mod), options));
  },
  add: (slots, durationArg) => createPlainTime(internal.movePlainTime(0, slots, toDurationSlots(durationArg))),
  subtract: (slots, durationArg) => createPlainTime(internal.movePlainTime(1, slots, toDurationSlots(durationArg))),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainTimes(0, slots, toPlainTimeSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainTimes(1, slots, toPlainTimeSlots(otherArg), options)),
  round: (slots, options) => createPlainTime(internal.roundPlainTime(slots, options)),
  equals: (slots, other) => internal.plainTimesEqual(slots, toPlainTimeSlots(other)),
  toZonedDateTime: (slots, options) => createZonedDateTime(internal.plainTimeToZonedDateTime(refineTimeZoneSlot, toPlainDateSlots, createTimeZoneOps, slots, options)),
  toPlainDateTime: (slots, plainDateArg) => createPlainDateTime(internal.plainTimeToPlainDateTime(slots, toPlainDateSlots(plainDateArg))),
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainTimeIso,
  toJSON: slots => internal.formatPlainTimeIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainTime(toPlainTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoTimeFields(toPlainTimeSlots(arg0), toPlainTimeSlots(arg1))
}), [PlainYearMonth, createPlainYearMonth, getPlainYearMonthSlots] = createSlotClass(internal.PlainYearMonthBranding, internal.bindArgs(internal.constructPlainYearMonthSlots, refineCalendarSlot), {
  ...calendarIdGetters,
  ...yearMonthGetters
}, {
  getISOFields: removeBranding,
  getCalendar: createCalendarFromSlots,
  with(slots, mod, options) {
    return createPlainYearMonth(internal.plainYearMonthWithFields(createYearMonthModOps, slots, this, rejectInvalidBag(mod), options));
  },
  add: (slots, durationArg, options) => createPlainYearMonth(internal.movePlainYearMonth(createYearMonthMoveOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainYearMonth(internal.movePlainYearMonth(createYearMonthMoveOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainYearMonth(createYearMonthDiffOps, 0, slots, toPlainYearMonthSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainYearMonth(createYearMonthDiffOps, 1, slots, toPlainYearMonthSlots(otherArg), options)),
  equals: (slots, otherArg) => internal.plainYearMonthsEqual(slots, toPlainYearMonthSlots(otherArg)),
  toPlainDate(slots, bag) {
    return createPlainDate(internal.plainYearMonthToPlainDate(createDateModOps, slots, this, bag));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainYearMonthFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainYearMonthIso,
  toJSON: slots => internal.formatPlainYearMonthIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainYearMonth(toPlainYearMonthSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateFields(toPlainYearMonthSlots(arg0), toPlainYearMonthSlots(arg1))
}), [PlainDateTime, createPlainDateTime] = createSlotClass(internal.PlainDateTimeBranding, internal.bindArgs(internal.constructPlainDateTimeSlots, refineCalendarSlot), {
  ...calendarIdGetters,
  ...dateGetters,
  ...timeGetters
}, {
  getISOFields: removeBranding,
  getCalendar: createCalendarFromSlots,
  with(slots, mod, options) {
    return createPlainDateTime(internal.plainDateTimeWithFields(createDateModOps, slots, this, rejectInvalidBag(mod), options));
  },
  withCalendar: (slots, calendarArg) => createPlainDateTime(internal.slotsWithCalendar(slots, refineCalendarSlot(calendarArg))),
  withPlainDate: (slots, plainDateArg) => createPlainDateTime(internal.plainDateTimeWithPlainDate(slots, toPlainDateSlots(plainDateArg))),
  withPlainTime: (slots, plainTimeArg) => createPlainDateTime(internal.plainDateTimeWithPlainTime(slots, optionalToPlainTimeFields(plainTimeArg))),
  add: (slots, durationArg, options) => createPlainDateTime(internal.movePlainDateTime(createMoveOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainDateTime(internal.movePlainDateTime(createMoveOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainDateTimes(createDiffOps, 0, slots, toPlainDateTimeSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainDateTimes(createDiffOps, 1, slots, toPlainDateTimeSlots(otherArg), options)),
  round: (slots, options) => createPlainDateTime(internal.roundPlainDateTime(slots, options)),
  equals: (slots, otherArg) => internal.plainDateTimesEqual(slots, toPlainDateTimeSlots(otherArg)),
  toZonedDateTime: (slots, timeZoneArg, options) => createZonedDateTime(internal.plainDateTimeToZonedDateTime(createTimeZoneOps, slots, refineTimeZoneSlot(timeZoneArg), options)),
  toPlainDate: slots => createPlainDate(internal.createPlainDateSlots(slots)),
  toPlainTime: slots => createPlainTime(internal.createPlainTimeSlots(slots)),
  toPlainYearMonth(slots) {
    return createPlainYearMonth(internal.plainDateTimeToPlainYearMonth(createYearMonthRefineOps, slots, this));
  },
  toPlainMonthDay(slots) {
    return createPlainMonthDay(internal.plainDateTimeToPlainMonthDay(createMonthDayRefineOps, slots, this));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainDateTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainDateTimeIso,
  toJSON: slots => internal.formatPlainDateTimeIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainDateTime(toPlainDateTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateTimeFields(toPlainDateTimeSlots(arg0), toPlainDateTimeSlots(arg1))
}), [PlainDate, createPlainDate, getPlainDateSlots] = createSlotClass(internal.PlainDateBranding, internal.bindArgs(internal.constructPlainDateSlots, refineCalendarSlot), {
  ...calendarIdGetters,
  ...dateGetters
}, {
  getISOFields: removeBranding,
  getCalendar: createCalendarFromSlots,
  with(slots, mod, options) {
    return createPlainDate(internal.plainDateWithFields(createDateModOps, slots, this, rejectInvalidBag(mod), options));
  },
  withCalendar: (slots, calendarArg) => createPlainDate(internal.slotsWithCalendar(slots, refineCalendarSlot(calendarArg))),
  add: (slots, durationArg, options) => createPlainDate(internal.movePlainDate(createMoveOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createPlainDate(internal.movePlainDate(createMoveOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.diffPlainDates(createDiffOps, 0, slots, toPlainDateSlots(otherArg), options)),
  since: (slots, otherArg, options) => createDuration(internal.diffPlainDates(createDiffOps, 1, slots, toPlainDateSlots(otherArg), options)),
  equals: (slots, otherArg) => internal.plainDatesEqual(slots, toPlainDateSlots(otherArg)),
  toZonedDateTime(slots, options) {
    const optionsObj = !internal.isObjectLike(options) || options instanceof TimeZone ? {
      timeZone: options
    } : options;
    return createZonedDateTime(internal.plainDateToZonedDateTime(refineTimeZoneSlot, toPlainTimeSlots, createTimeZoneOps, slots, optionsObj));
  },
  toPlainDateTime: (slots, plainTimeArg) => createPlainDateTime(internal.plainDateToPlainDateTime(slots, optionalToPlainTimeFields(plainTimeArg))),
  toPlainYearMonth(slots) {
    return createPlainYearMonth(internal.plainDateToPlainYearMonth(createYearMonthRefineOps, slots, this));
  },
  toPlainMonthDay(slots) {
    return createPlainMonthDay(internal.plainDateToPlainMonthDay(createMonthDayRefineOps, slots, this));
  },
  toLocaleString(slots, locales, options) {
    const [format, epochMilli] = prepPlainDateFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: internal.formatPlainDateIso,
  toJSON: slots => internal.formatPlainDateIso(slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createPlainDate(toPlainDateSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareIsoDateFields(toPlainDateSlots(arg0), toPlainDateSlots(arg1))
}), refineAdapters = {
  fields(calendarProtocol, fieldsMethod, fieldNames) {
    return [ ...fieldsMethod.call(calendarProtocol, fieldNames) ];
  }
}, dateRefineAdapters = {
  dateFromFields(calendarProtocol, dateFromFields, fields, options) {
    return getPlainDateSlots(dateFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
  },
  ...refineAdapters
}, yearMonthRefineAdapters = {
  yearMonthFromFields(calendarProtocol, yearMonthFromFields, fields, options) {
    return getPlainYearMonthSlots(yearMonthFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
  },
  ...refineAdapters
}, monthDayRefineAdapters = {
  monthDayFromFields(calendarProtocol, monthDayFromFields, fields, options) {
    return getPlainMonthDaySlots(monthDayFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
  },
  ...refineAdapters
}, modAdapters = {
  mergeFields(calendarProtocol, mergeFields, fields, additionalFields) {
    return internal.requireObjectLike(mergeFields.call(calendarProtocol, Object.assign(Object.create(null), fields), Object.assign(Object.create(null), additionalFields)));
  }
}, dateModAdapters = {
  ...dateRefineAdapters,
  ...modAdapters
}, yearMonthModAdapters = {
  ...yearMonthRefineAdapters,
  ...modAdapters
}, monthDayModAdapters = {
  ...monthDayRefineAdapters,
  ...modAdapters
}, moveAdapters = {
  dateAdd(calendarProtocol, dateAdd, isoFields, durationFields, options) {
    return getPlainDateSlots(dateAdd.call(calendarProtocol, createPlainDate(internal.createPlainDateSlots(isoFields, calendarProtocol)), createDuration(internal.createDurationSlots(durationFields)), options));
  }
}, diffAdapters = {
  ...moveAdapters,
  dateUntil(calendarProtocol, dateUntil, isoFields0, isoFields1, largestUnit, origOptions) {
    return getDurationSlots(dateUntil.call(calendarProtocol, createPlainDate(internal.createPlainDateSlots(isoFields0, calendarProtocol)), createPlainDate(internal.createPlainDateSlots(isoFields1, calendarProtocol)), Object.assign(Object.create(null), origOptions, {
      largestUnit: internal.unitNamesAsc[largestUnit]
    })));
  }
}, yearMonthMoveAdapters = {
  ...moveAdapters,
  day: dayAdapter
}, yearMonthDiffAdapters = {
  ...diffAdapters,
  day: dayAdapter
}, createYearMonthRefineOps = createCompoundOpsCreator(yearMonthRefineAdapters), createDateRefineOps = createCompoundOpsCreator(dateRefineAdapters), createMonthDayRefineOps = createCompoundOpsCreator(monthDayRefineAdapters), createYearMonthModOps = createCompoundOpsCreator(yearMonthModAdapters), createDateModOps = createCompoundOpsCreator(dateModAdapters), createMonthDayModOps = createCompoundOpsCreator(monthDayModAdapters), createMoveOps = createCompoundOpsCreator(moveAdapters), createDiffOps = createCompoundOpsCreator(diffAdapters), createYearMonthMoveOps = createCompoundOpsCreator(yearMonthMoveAdapters), createYearMonthDiffOps = createCompoundOpsCreator(yearMonthDiffAdapters), [Duration, createDuration, getDurationSlots] = createSlotClass(internal.DurationBranding, internal.constructDurationSlots, {
  ...durationGetters,
  blank: internal.getDurationBlank
}, {
  with: (slots, mod) => createDuration(internal.durationWithFields(slots, mod)),
  negated: slots => createDuration(internal.negateDuration(slots)),
  abs: slots => createDuration(internal.absDuration(slots)),
  add: (slots, otherArg, options) => createDuration(internal.addDurations(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, 0, slots, toDurationSlots(otherArg), options)),
  subtract: (slots, otherArg, options) => createDuration(internal.addDurations(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, 1, slots, toDurationSlots(otherArg), options)),
  round: (slots, options) => createDuration(internal.roundDuration(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, slots, options)),
  total: (slots, options) => internal.totalDuration(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, slots, options),
  toLocaleString(slots, locales, options) {
    return Intl.DurationFormat ? new Intl.DurationFormat(locales, options).format(this) : internal.formatDurationIso(slots);
  },
  toString: internal.formatDurationIso,
  toJSON: slots => internal.formatDurationIso(slots),
  valueOf: neverValueOf
}, {
  from: arg => createDuration(toDurationSlots(arg)),
  compare: (durationArg0, durationArg1, options) => internal.compareDurations(refinePublicRelativeTo, createMoveOps, createTimeZoneOps, toDurationSlots(durationArg0), toDurationSlots(durationArg1), options)
}), calendarMethods = {
  toString: slots => slots.id,
  toJSON: slots => slots.id,
  ...calendarFieldMethods,
  dateAdd: ({id: id, native: native}, plainDateArg, durationArg, options) => createPlainDate(internal.createPlainDateSlots(native.dateAdd(toPlainDateSlots(plainDateArg), toDurationSlots(durationArg), options), id)),
  dateUntil: ({native: native}, plainDateArg0, plainDateArg1, options) => createDuration(internal.createDurationSlots(native.dateUntil(toPlainDateSlots(plainDateArg0), toPlainDateSlots(plainDateArg1), internal.refineDateDiffOptions(options)))),
  dateFromFields: ({id: id, native: native}, fields, options) => createPlainDate(internal.refinePlainDateBag(native, fields, options, internal.getRequiredDateFields(id))),
  yearMonthFromFields: ({id: id, native: native}, fields, options) => createPlainYearMonth(internal.refinePlainYearMonthBag(native, fields, options, internal.getRequiredYearMonthFields(id))),
  monthDayFromFields: ({id: id, native: native}, fields, options) => createPlainMonthDay(internal.refinePlainMonthDayBag(native, 0, fields, options, internal.getRequiredMonthDayFields(id))),
  fields({native: native}, fieldNames) {
    const allowed = new Set(internal.dateFieldNamesAlpha), fieldNamesArray = [];
    for (const fieldName of fieldNames) {
      if (internal.requireString(fieldName), !allowed.has(fieldName)) {
        throw new RangeError(internal.forbiddenField(fieldName));
      }
      allowed.delete(fieldName), fieldNamesArray.push(fieldName);
    }
    return native.fields(fieldNamesArray);
  },
  mergeFields: ({native: native}, fields0, fields1) => native.mergeFields(internal.excludeUndefinedProps(internal.requireNonNullish(fields0)), internal.excludeUndefinedProps(internal.requireNonNullish(fields1)))
}, [Calendar] = createSlotClass("Calendar", (id => {
  const slotId = internal.refineCalendarId(id);
  return {
    branding: "Calendar",
    id: slotId,
    native: internal.createNativeStandardOps(slotId)
  };
}), {
  id: slots => slots.id
}, calendarMethods, {
  from(arg) {
    const calendarSlot = refineCalendarSlot(arg);
    return "string" == typeof calendarSlot ? new Calendar(calendarSlot) : calendarSlot;
  }
}), validateCalendarProtocol = createProtocolValidator(Object.keys(calendarMethods).slice(4)), [ZonedDateTime, createZonedDateTime] = createSlotClass(internal.ZonedDateTimeBranding, internal.bindArgs(internal.constructZonedDateTimeSlots, refineCalendarSlot, refineTimeZoneSlot), {
  ...epochGetters,
  ...calendarIdGetters,
  ...adaptDateMethods(dateGetters),
  ...adaptDateMethods(timeGetters),
  offset: slots => internal.formatOffsetNano(slotsToIso(slots).offsetNanoseconds),
  offsetNanoseconds: slots => slotsToIso(slots).offsetNanoseconds,
  timeZoneId: slots => internal.getId(slots.timeZone),
  hoursInDay: slots => internal.computeZonedHoursInDay(createTimeZoneOps, slots)
}, {
  getISOFields: slots => internal.buildZonedIsoFields(createTimeZoneOffsetOps, slots),
  getCalendar: createCalendarFromSlots,
  getTimeZone: ({timeZone: timeZone}) => "string" == typeof timeZone ? new TimeZone(timeZone) : timeZone,
  with(slots, mod, options) {
    return createZonedDateTime(internal.zonedDateTimeWithFields(createDateModOps, createTimeZoneOps, slots, this, rejectInvalidBag(mod), options));
  },
  withCalendar: (slots, calendarArg) => createZonedDateTime(internal.slotsWithCalendar(slots, refineCalendarSlot(calendarArg))),
  withTimeZone: (slots, timeZoneArg) => createZonedDateTime(internal.slotsWithTimeZone(slots, refineTimeZoneSlot(timeZoneArg))),
  withPlainDate: (slots, plainDateArg) => createZonedDateTime(internal.zonedDateTimeWithPlainDate(createTimeZoneOps, slots, toPlainDateSlots(plainDateArg))),
  withPlainTime: (slots, plainTimeArg) => createZonedDateTime(internal.zonedDateTimeWithPlainTime(createTimeZoneOps, slots, optionalToPlainTimeFields(plainTimeArg))),
  add: (slots, durationArg, options) => createZonedDateTime(internal.moveZonedDateTime(createMoveOps, createTimeZoneOps, 0, slots, toDurationSlots(durationArg), options)),
  subtract: (slots, durationArg, options) => createZonedDateTime(internal.moveZonedDateTime(createMoveOps, createTimeZoneOps, 1, slots, toDurationSlots(durationArg), options)),
  until: (slots, otherArg, options) => createDuration(internal.createDurationSlots(internal.diffZonedDateTimes(createDiffOps, createTimeZoneOps, 0, slots, toZonedDateTimeSlots(otherArg), options))),
  since: (slots, otherArg, options) => createDuration(internal.createDurationSlots(internal.diffZonedDateTimes(createDiffOps, createTimeZoneOps, 1, slots, toZonedDateTimeSlots(otherArg), options))),
  round: (slots, options) => createZonedDateTime(internal.roundZonedDateTime(createTimeZoneOps, slots, options)),
  startOfDay: slots => createZonedDateTime(internal.computeZonedStartOfDay(createTimeZoneOps, slots)),
  equals: (slots, otherArg) => internal.zonedDateTimesEqual(slots, toZonedDateTimeSlots(otherArg)),
  toInstant: slots => createInstant(internal.zonedDateTimeToInstant(slots)),
  toPlainDateTime: slots => createPlainDateTime(internal.zonedDateTimeToPlainDateTime(createTimeZoneOffsetOps, slots)),
  toPlainDate: slots => createPlainDate(internal.zonedDateTimeToPlainDate(createTimeZoneOffsetOps, slots)),
  toPlainTime: slots => createPlainTime(internal.zonedDateTimeToPlainTime(createTimeZoneOffsetOps, slots)),
  toPlainYearMonth(slots) {
    return createPlainYearMonth(internal.zonedDateTimeToPlainYearMonth(createYearMonthRefineOps, slots, this));
  },
  toPlainMonthDay(slots) {
    return createPlainMonthDay(internal.zonedDateTimeToPlainMonthDay(createMonthDayRefineOps, slots, this));
  },
  toLocaleString(slots, locales, options = {}) {
    const [format, epochMilli] = prepZonedDateTimeFormat(locales, options, slots);
    return format.format(epochMilli);
  },
  toString: (slots, options) => internal.formatZonedDateTimeIso(createTimeZoneOffsetOps, slots, options),
  toJSON: slots => internal.formatZonedDateTimeIso(createTimeZoneOffsetOps, slots),
  valueOf: neverValueOf
}, {
  from: (arg, options) => createZonedDateTime(toZonedDateTimeSlots(arg, options)),
  compare: (arg0, arg1) => internal.compareZonedDateTimes(toZonedDateTimeSlots(arg0), toZonedDateTimeSlots(arg1))
}), Now = Object.defineProperties({}, {
  ...internal.createStringTagDescriptors("Temporal.Now"),
  ...internal.createPropDescriptors({
    timeZoneId: () => internal.getCurrentTimeZoneId(),
    instant: () => createInstant(internal.createInstantSlots(internal.getCurrentEpochNano())),
    zonedDateTime: (calendar, timeZone = internal.getCurrentTimeZoneId()) => createZonedDateTime(internal.createZonedDateTimeSlots(internal.getCurrentEpochNano(), refineTimeZoneSlot(timeZone), refineCalendarSlot(calendar))),
    zonedDateTimeISO: (timeZone = internal.getCurrentTimeZoneId()) => createZonedDateTime(internal.createZonedDateTimeSlots(internal.getCurrentEpochNano(), refineTimeZoneSlot(timeZone), internal.isoCalendarId)),
    plainDateTime: (calendar, timeZone = internal.getCurrentTimeZoneId()) => createPlainDateTime(internal.createPlainDateTimeSlots(internal.getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), refineCalendarSlot(calendar))),
    plainDateTimeISO: (timeZone = internal.getCurrentTimeZoneId()) => createPlainDateTime(internal.createPlainDateTimeSlots(internal.getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), internal.isoCalendarId)),
    plainDate: (calendar, timeZone = internal.getCurrentTimeZoneId()) => createPlainDate(internal.createPlainDateSlots(internal.getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), refineCalendarSlot(calendar))),
    plainDateISO: (timeZone = internal.getCurrentTimeZoneId()) => createPlainDate(internal.createPlainDateSlots(internal.getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), internal.isoCalendarId)),
    plainTimeISO: (timeZone = internal.getCurrentTimeZoneId()) => createPlainTime(internal.createPlainTimeSlots(internal.getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone)))))
  })
}), Temporal = Object.defineProperties({}, {
  ...internal.createStringTagDescriptors("Temporal"),
  ...internal.createPropDescriptors({
    PlainYearMonth: PlainYearMonth,
    PlainMonthDay: PlainMonthDay,
    PlainDate: PlainDate,
    PlainTime: PlainTime,
    PlainDateTime: PlainDateTime,
    ZonedDateTime: ZonedDateTime,
    Instant: Instant,
    Calendar: Calendar,
    TimeZone: TimeZone,
    Duration: Duration,
    Now: Now
  })
}), DateTimeFormat = function() {
  const members = internal.RawDateTimeFormat.prototype, memberDescriptors = Object.getOwnPropertyDescriptors(members), classDescriptors = Object.getOwnPropertyDescriptors(internal.RawDateTimeFormat), DateTimeFormat = function(locales, options = {}) {
    if (!(this instanceof DateTimeFormat)) {
      return new DateTimeFormat(locales, options);
    }
    internalsMap.set(this, ((locales, options = {}) => {
      const rawFormat = new internal.RawDateTimeFormat(locales, options), resolveOptions = rawFormat.resolvedOptions(), resolvedLocale = resolveOptions.locale, copiedOptions = internal.pluckProps(Object.keys(options), resolveOptions), queryFormatPrepperForBranding = internal.memoize(createFormatPrepperForBranding), prepFormat = (...formattables) => {
        let branding;
        const slotsList = formattables.map(((formattable, i) => {
          const slots = getSlots(formattable), slotsBranding = (slots || {}).branding;
          if (i && branding && branding !== slotsBranding) {
            throw new TypeError(internal.mismatchingFormatTypes);
          }
          return branding = slotsBranding, slots;
        }));
        return branding ? queryFormatPrepperForBranding(branding)(resolvedLocale, copiedOptions, ...slotsList) : [ rawFormat, ...formattables ];
      };
      return prepFormat.rawFormat = rawFormat, prepFormat;
    })(locales, options));
  };
  for (const memberName in memberDescriptors) {
    const memberDescriptor = memberDescriptors[memberName], formatLikeMethod = memberName.startsWith("format") && createFormatMethod(memberName);
    "function" == typeof memberDescriptor.value ? memberDescriptor.value = "constructor" === memberName ? DateTimeFormat : formatLikeMethod || createProxiedMethod(memberName) : formatLikeMethod && (memberDescriptor.get = function() {
      return formatLikeMethod.bind(this);
    });
  }
  return classDescriptors.prototype.value = Object.create(members, memberDescriptors), 
  Object.defineProperties(DateTimeFormat, classDescriptors), DateTimeFormat;
}(), internalsMap = new WeakMap, IntlExtended = Object.defineProperties(Object.create(Intl), internal.createPropDescriptors({
  DateTimeFormat: DateTimeFormat
}));

exports.DateTimeFormat = DateTimeFormat, exports.IntlExtended = IntlExtended, exports.Temporal = Temporal, 
exports.toTemporalInstant = function() {
  return createInstant(internal.createInstantSlots(internal.numberToBigNano(this.valueOf(), internal.nanoInMilli)));
};


/***/ },

/***/ "./node_modules/temporal-polyfill/chunks/internal.cjs"
/*!************************************************************!*\
  !*** ./node_modules/temporal-polyfill/chunks/internal.cjs ***!
  \************************************************************/
(__unused_webpack_module, exports) {

"use strict";


function clampProp(props, propName, min, max, overflow) {
  return clampEntity(propName, getDefinedProp(props, propName), min, max, overflow);
}

function clampEntity(entityName, num, min, max, overflow, choices) {
  const clamped = clampNumber(num, min, max);
  if (overflow && num !== clamped) {
    throw new RangeError(numberOutOfRange(entityName, num, min, max, choices));
  }
  return clamped;
}

function getDefinedProp(props, propName) {
  const propVal = props[propName];
  if (void 0 === propVal) {
    throw new TypeError(missingField(propName));
  }
  return propVal;
}

function isObjectLike(arg) {
  return null !== arg && /object|function/.test(typeof arg);
}

function memoize(generator, MapClass = Map) {
  const map = new MapClass;
  return (key, ...otherArgs) => {
    if (map.has(key)) {
      return map.get(key);
    }
    const val = generator(key, ...otherArgs);
    return map.set(key, val), val;
  };
}

function createPropDescriptors(propVals, readonly) {
  return mapProps((value => ({
    value: value,
    configurable: 1,
    writable: !readonly
  })), propVals);
}

function zipProps(propNamesRev, args) {
  const res = {};
  let i = propNamesRev.length;
  for (const arg of args) {
    res[propNamesRev[--i]] = arg;
  }
  return res;
}

function mapProps(transformer, props, extraArg) {
  const res = {};
  for (const propName in props) {
    res[propName] = transformer(props[propName], propName, extraArg);
  }
  return res;
}

function mapPropNames(generator, propNames, extraArg) {
  const props = {};
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    props[propName] = generator(propName, i, extraArg);
  }
  return props;
}

function pluckProps(propNames, props) {
  const res = {};
  for (const propName of propNames) {
    res[propName] = props[propName];
  }
  return res;
}

function excludePropsByName(propNames, props) {
  const filteredProps = {};
  for (const propName in props) {
    propNames.has(propName) || (filteredProps[propName] = props[propName]);
  }
  return filteredProps;
}

function allPropsEqual(propNames, props0, props1) {
  for (const propName of propNames) {
    if (props0[propName] !== props1[propName]) {
      return 0;
    }
  }
  return 1;
}

function zeroOutProps(propNames, clearUntilI, props) {
  const copy = {
    ...props
  };
  for (let i = 0; i < clearUntilI; i++) {
    copy[propNames[i]] = 0;
  }
  return copy;
}

function bindArgs(f, ...boundArgs) {
  return (...dynamicArgs) => f(...boundArgs, ...dynamicArgs);
}

function capitalize(s) {
  return s[0].toUpperCase() + s.substring(1);
}

function sortStrings(strs) {
  return strs.slice().sort();
}

function padNumber(digits, num) {
  return String(num).padStart(digits, "0");
}

function compareNumbers(a, b) {
  return Math.sign(a - b);
}

function clampNumber(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function divModFloor(num, divisor) {
  return [ Math.floor(num / divisor), modFloor(num, divisor) ];
}

function modFloor(num, divisor) {
  return (num % divisor + divisor) % divisor;
}

function divModTrunc(num, divisor) {
  return [ divTrunc(num, divisor), modTrunc(num, divisor) ];
}

function divTrunc(num, divisor) {
  return Math.trunc(num / divisor) || 0;
}

function modTrunc(num, divisor) {
  return num % divisor || 0;
}

function hasHalf(num) {
  return .5 === Math.abs(num % 1);
}

function givenFieldsToBigNano(fields, largestUnit, fieldNames) {
  let timeNano = 0, days = 0;
  for (let unit = 0; unit <= largestUnit; unit++) {
    const fieldVal = fields[fieldNames[unit]], unitNano = unitNanoMap[unit], unitInDay = nanoInUtcDay / unitNano, [unitDays, leftoverUnits] = divModTrunc(fieldVal, unitInDay);
    timeNano += leftoverUnits * unitNano, days += unitDays;
  }
  const [timeDays, leftoverNano] = divModTrunc(timeNano, nanoInUtcDay);
  return [ days + timeDays, leftoverNano ];
}

function nanoToGivenFields(nano, largestUnit, fieldNames) {
  const fields = {};
  for (let unit = largestUnit; unit >= 0; unit--) {
    const divisor = unitNanoMap[unit];
    fields[fieldNames[unit]] = divTrunc(nano, divisor), nano = modTrunc(nano, divisor);
  }
  return fields;
}

function requirePositiveInteger(arg) {
  return requireNumberIsPositive(requireInteger(arg));
}

function requireInteger(arg) {
  return requireNumberIsInteger(requireNumber(arg));
}

function requirePropDefined(optionName, optionVal) {
  if (null == optionVal) {
    throw new RangeError(missingField(optionName));
  }
  return optionVal;
}

function requireObjectLike(arg) {
  if (!isObjectLike(arg)) {
    throw new TypeError(invalidObject);
  }
  return arg;
}

function requireType(typeName, arg, entityName = typeName) {
  if (typeof arg !== typeName) {
    throw new TypeError(invalidEntity(entityName, arg));
  }
  return arg;
}

function requireNumberIsInteger(num, entityName = "number") {
  if (!Number.isInteger(num)) {
    throw new RangeError(expectedInteger(entityName, num));
  }
  return num || 0;
}

function requireNumberIsPositive(num, entityName = "number") {
  if (num <= 0) {
    throw new RangeError(expectedPositive(entityName, num));
  }
  return num;
}

function toString(arg) {
  if ("symbol" == typeof arg) {
    throw new TypeError(forbiddenSymbolToString);
  }
  return String(arg);
}

function toStringViaPrimitive(arg, entityName) {
  return isObjectLike(arg) ? String(arg) : requireString(arg, entityName);
}

function toBigInt(bi) {
  if ("string" == typeof bi) {
    return BigInt(bi);
  }
  if ("bigint" != typeof bi) {
    throw new TypeError(invalidBigInt(bi));
  }
  return bi;
}

function toNumber(arg, entityName = "number") {
  if ("bigint" == typeof arg) {
    throw new TypeError(forbiddenBigIntToNumber(entityName));
  }
  if (arg = Number(arg), !Number.isFinite(arg)) {
    throw new RangeError(expectedFinite(entityName, arg));
  }
  return arg;
}

function toInteger(arg, entityName) {
  return Math.trunc(toNumber(arg, entityName)) || 0;
}

function toStrictInteger(arg, entityName) {
  return requireNumberIsInteger(toNumber(arg, entityName), entityName);
}

function toPositiveInteger(arg, entityName) {
  return requireNumberIsPositive(toInteger(arg, entityName), entityName);
}

function createBigNano(days, timeNano) {
  let [extraDays, newTimeNano] = divModTrunc(timeNano, nanoInUtcDay), newDays = days + extraDays;
  const newDaysSign = Math.sign(newDays);
  return newDaysSign && newDaysSign === -Math.sign(newTimeNano) && (newDays -= newDaysSign, 
  newTimeNano += newDaysSign * nanoInUtcDay), [ newDays, newTimeNano ];
}

function addBigNanos(a, b, sign = 1) {
  return createBigNano(a[0] + b[0] * sign, a[1] + b[1] * sign);
}

function moveBigNano(a, b) {
  return createBigNano(a[0], a[1] + b);
}

function diffBigNanos(a, b) {
  return addBigNanos(b, a, -1);
}

function compareBigNanos(a, b) {
  return compareNumbers(a[0], b[0]) || compareNumbers(a[1], b[1]);
}

function bigNanoOutside(subject, rangeStart, rangeEndExcl) {
  return -1 === compareBigNanos(subject, rangeStart) || 1 === compareBigNanos(subject, rangeEndExcl);
}

function bigIntToBigNano(num, multiplierNano = 1) {
  const wholeInDay = BigInt(nanoInUtcDay / multiplierNano);
  return [ Number(num / wholeInDay), Number(num % wholeInDay) * multiplierNano ];
}

function numberToBigNano(num, multiplierNano = 1) {
  const wholeInDay = nanoInUtcDay / multiplierNano, [days, remainder] = divModTrunc(num, wholeInDay);
  return [ days, remainder * multiplierNano ];
}

function bigNanoToBigInt(bigNano, divisorNano = 1) {
  const [days, timeNano] = bigNano, whole = Math.floor(timeNano / divisorNano), wholeInDay = nanoInUtcDay / divisorNano;
  return BigInt(days) * BigInt(wholeInDay) + BigInt(whole);
}

function bigNanoToNumber(bigNano, divisorNano = 1, exact) {
  const [days, timeNano] = bigNano, [whole, remainderNano] = divModTrunc(timeNano, divisorNano);
  return days * (nanoInUtcDay / divisorNano) + (whole + (exact ? remainderNano / divisorNano : 0));
}

function divModBigNano(bigNano, divisorNano, divModFunc = divModFloor) {
  const [days, timeNano] = bigNano, [whole, remainderNano] = divModFunc(timeNano, divisorNano);
  return [ days * (nanoInUtcDay / divisorNano) + whole, remainderNano ];
}

function hashIntlFormatParts(intlFormat, epochMilliseconds) {
  const parts = intlFormat.formatToParts(epochMilliseconds), hash = {};
  for (const part of parts) {
    hash[part.type] = part.value;
  }
  return hash;
}

function checkIsoYearMonthInBounds(isoFields) {
  return clampProp(isoFields, "isoYear", isoYearMin, isoYearMax, 1), isoFields.isoYear === isoYearMin ? clampProp(isoFields, "isoMonth", 4, 12, 1) : isoFields.isoYear === isoYearMax && clampProp(isoFields, "isoMonth", 1, 9, 1), 
  isoFields;
}

function checkIsoDateInBounds(isoFields) {
  return checkIsoDateTimeInBounds({
    ...isoFields,
    ...isoTimeFieldDefaults,
    isoHour: 12
  }), isoFields;
}

function checkIsoDateTimeInBounds(isoFields) {
  const isoYear = clampProp(isoFields, "isoYear", isoYearMin, isoYearMax, 1), nudge = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0;
  return nudge && checkEpochNanoInBounds(isoToEpochNano({
    ...isoFields,
    isoDay: isoFields.isoDay + nudge,
    isoNanosecond: isoFields.isoNanosecond - nudge
  })), isoFields;
}

function checkEpochNanoInBounds(epochNano) {
  if (!epochNano || bigNanoOutside(epochNano, epochNanoMin, epochNanoMax)) {
    throw new RangeError(outOfBoundsDate);
  }
  return epochNano;
}

function isoTimeFieldsToNano(isoTimeFields) {
  return givenFieldsToBigNano(isoTimeFields, 5, isoTimeFieldNamesAsc)[1];
}

function nanoToIsoTimeAndDay(nano) {
  const [dayDelta, timeNano] = divModFloor(nano, nanoInUtcDay);
  return [ nanoToGivenFields(timeNano, 5, isoTimeFieldNamesAsc), dayDelta ];
}

function epochNanoToSec(epochNano) {
  return epochNanoToSecMod(epochNano)[0];
}

function epochNanoToSecMod(epochNano) {
  return divModBigNano(epochNano, nanoInSec);
}

function isoToEpochMilli(isoDateTimeFields) {
  return isoArgsToEpochMilli(isoDateTimeFields.isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond, isoDateTimeFields.isoMillisecond);
}

function isoToEpochNano(isoFields) {
  const epochMilli = isoToEpochMilli(isoFields);
  if (void 0 !== epochMilli) {
    const [days, milliRemainder] = divModTrunc(epochMilli, milliInDay);
    return [ days, milliRemainder * nanoInMilli + (isoFields.isoMicrosecond || 0) * nanoInMicro + (isoFields.isoNanosecond || 0) ];
  }
}

function isoToEpochNanoWithOffset(isoFields, offsetNano) {
  const [newIsoTimeFields, dayDelta] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) - offsetNano);
  return checkEpochNanoInBounds(isoToEpochNano({
    ...isoFields,
    isoDay: isoFields.isoDay + dayDelta,
    ...newIsoTimeFields
  }));
}

function isoArgsToEpochSec(...args) {
  return isoArgsToEpochMilli(...args) / milliInSec;
}

function isoArgsToEpochMilli(...args) {
  const [legacyDate, daysNudged] = isoToLegacyDate(...args), epochMilli = legacyDate.valueOf();
  if (!isNaN(epochMilli)) {
    return epochMilli - daysNudged * milliInDay;
  }
}

function isoToLegacyDate(isoYear, isoMonth = 1, isoDay = 1, isoHour = 0, isoMinute = 0, isoSec = 0, isoMilli = 0) {
  const daysNudged = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0, legacyDate = new Date;
  return legacyDate.setUTCHours(isoHour, isoMinute, isoSec, isoMilli), legacyDate.setUTCFullYear(isoYear, isoMonth - 1, isoDay + daysNudged), 
  [ legacyDate, daysNudged ];
}

function epochNanoToIso(epochNano, offsetNano) {
  let [days, timeNano] = moveBigNano(epochNano, offsetNano);
  timeNano < 0 && (timeNano += nanoInUtcDay, days -= 1);
  const [timeMilli, nanoRemainder] = divModFloor(timeNano, nanoInMilli), [isoMicrosecond, isoNanosecond] = divModFloor(nanoRemainder, nanoInMicro);
  return epochMilliToIso(days * milliInDay + timeMilli, isoMicrosecond, isoNanosecond);
}

function epochMilliToIso(epochMilli, isoMicrosecond = 0, isoNanosecond = 0) {
  const daysOver = Math.ceil(Math.max(0, Math.abs(epochMilli) - maxMilli) / milliInDay) * Math.sign(epochMilli), legacyDate = new Date(epochMilli - daysOver * milliInDay);
  return zipProps(isoDateTimeFieldNamesAsc, [ legacyDate.getUTCFullYear(), legacyDate.getUTCMonth() + 1, legacyDate.getUTCDate() + daysOver, legacyDate.getUTCHours(), legacyDate.getUTCMinutes(), legacyDate.getUTCSeconds(), legacyDate.getUTCMilliseconds(), isoMicrosecond, isoNanosecond ]);
}

function computeIsoDateParts(isoFields) {
  return [ isoFields.isoYear, isoFields.isoMonth, isoFields.isoDay ];
}

function computeIsoMonthsInYear() {
  return isoMonthsInYear;
}

function computeIsoDaysInMonth(isoYear, isoMonth) {
  switch (isoMonth) {
   case 2:
    return computeIsoInLeapYear(isoYear) ? 29 : 28;

   case 4:
   case 6:
   case 9:
   case 11:
    return 30;
  }
  return 31;
}

function computeIsoDaysInYear(isoYear) {
  return computeIsoInLeapYear(isoYear) ? 366 : 365;
}

function computeIsoInLeapYear(isoYear) {
  return isoYear % 4 == 0 && (isoYear % 100 != 0 || isoYear % 400 == 0);
}

function computeIsoDayOfWeek(isoDateFields) {
  const [legacyDate, daysNudged] = isoToLegacyDate(isoDateFields.isoYear, isoDateFields.isoMonth, isoDateFields.isoDay);
  return modFloor(legacyDate.getUTCDay() - daysNudged, 7) || 7;
}

function computeGregoryEraParts({isoYear: isoYear}) {
  return isoYear < 1 ? [ "bce", 1 - isoYear ] : [ "ce", isoYear ];
}

function checkIsoDateTimeFields(isoDateTimeFields) {
  return checkIsoDateFields(isoDateTimeFields), constrainIsoTimeFields(isoDateTimeFields, 1), 
  isoDateTimeFields;
}

function checkIsoDateFields(isoInternals) {
  return constrainIsoDateFields(isoInternals, 1), isoInternals;
}

function isIsoDateFieldsValid(isoFields) {
  return allPropsEqual(isoDateFieldNamesAsc, isoFields, constrainIsoDateFields(isoFields));
}

function constrainIsoDateFields(isoFields, overflow) {
  const {isoYear: isoYear} = isoFields, isoMonth = clampProp(isoFields, "isoMonth", 1, computeIsoMonthsInYear(), overflow);
  return {
    isoYear: isoYear,
    isoMonth: isoMonth,
    isoDay: clampProp(isoFields, "isoDay", 1, computeIsoDaysInMonth(isoYear, isoMonth), overflow)
  };
}

function constrainIsoTimeFields(isoTimeFields, overflow) {
  return zipProps(isoTimeFieldNamesAsc, [ clampProp(isoTimeFields, "isoHour", 0, 23, overflow), clampProp(isoTimeFields, "isoMinute", 0, 59, overflow), clampProp(isoTimeFields, "isoSecond", 0, 59, overflow), clampProp(isoTimeFields, "isoMillisecond", 0, 999, overflow), clampProp(isoTimeFields, "isoMicrosecond", 0, 999, overflow), clampProp(isoTimeFields, "isoNanosecond", 0, 999, overflow) ]);
}

function refineOverflowOptions(options) {
  return void 0 === options ? 0 : refineOverflow(requireObjectLike(options));
}

function refineZonedFieldOptions(options, defaultOffsetDisambig = 0) {
  options = normalizeOptions(options);
  const epochDisambig = refineEpochDisambig(options), offsetDisambig = refineOffsetDisambig(options, defaultOffsetDisambig);
  return [ refineOverflow(options), offsetDisambig, epochDisambig ];
}

function refineEpochDisambigOptions(options) {
  return refineEpochDisambig(normalizeOptions(options));
}

function refineDiffOptions(roundingModeInvert, options, defaultLargestUnit, maxUnit = 9, minUnit = 0, defaultRoundingMode = 4) {
  options = normalizeOptions(options);
  let largestUnit = refineLargestUnit(options, maxUnit, minUnit), roundingInc = parseRoundingIncInteger(options), roundingMode = refineRoundingMode(options, defaultRoundingMode);
  const smallestUnit = refineSmallestUnit(options, maxUnit, minUnit, 1);
  return null == largestUnit ? largestUnit = Math.max(defaultLargestUnit, smallestUnit) : checkLargestSmallestUnit(largestUnit, smallestUnit), 
  roundingInc = refineRoundingInc(roundingInc, smallestUnit, 1), roundingModeInvert && (roundingMode = (roundingMode => roundingMode < 4 ? (roundingMode + 2) % 4 : roundingMode)(roundingMode)), 
  [ largestUnit, smallestUnit, roundingInc, roundingMode ];
}

function refineRoundingOptions(options, maxUnit = 6, solarMode) {
  let roundingInc = parseRoundingIncInteger(options = normalizeOptionsOrString(options, smallestUnitStr));
  const roundingMode = refineRoundingMode(options, 7);
  let smallestUnit = refineSmallestUnit(options, maxUnit);
  return smallestUnit = requirePropDefined(smallestUnitStr, smallestUnit), roundingInc = refineRoundingInc(roundingInc, smallestUnit, void 0, solarMode), 
  [ smallestUnit, roundingInc, roundingMode ];
}

function refineDateDisplayOptions(options) {
  return refineCalendarDisplay(normalizeOptions(options));
}

function refineTimeDisplayOptions(options, maxSmallestUnit) {
  return refineTimeDisplayTuple(normalizeOptions(options), maxSmallestUnit);
}

function refineTimeDisplayTuple(options, maxSmallestUnit = 4) {
  const subsecDigits = refineSubsecDigits(options);
  return [ refineRoundingMode(options, 4), ...refineSmallestUnitAndSubsecDigits(refineSmallestUnit(options, maxSmallestUnit), subsecDigits) ];
}

function refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) {
  return null != smallestUnit ? [ unitNanoMap[smallestUnit], smallestUnit < 4 ? 9 - 3 * smallestUnit : -1 ] : [ void 0 === subsecDigits ? 1 : 10 ** (9 - subsecDigits), subsecDigits ];
}

function parseRoundingIncInteger(options) {
  const roundingInc = options[roundingIncName];
  return void 0 === roundingInc ? 1 : toInteger(roundingInc, roundingIncName);
}

function refineRoundingInc(roundingInc, smallestUnit, allowManyLargeUnits, solarMode) {
  const upUnitNano = solarMode ? nanoInUtcDay : unitNanoMap[smallestUnit + 1];
  if (upUnitNano) {
    const unitNano = unitNanoMap[smallestUnit];
    if (upUnitNano % ((roundingInc = clampEntity(roundingIncName, roundingInc, 1, upUnitNano / unitNano - (solarMode ? 0 : 1), 1)) * unitNano)) {
      throw new RangeError(invalidEntity(roundingIncName, roundingInc));
    }
  } else {
    roundingInc = clampEntity(roundingIncName, roundingInc, 1, allowManyLargeUnits ? 10 ** 9 : 1, 1);
  }
  return roundingInc;
}

function refineSubsecDigits(options) {
  let subsecDigits = options[subsecDigitsName];
  if (void 0 !== subsecDigits) {
    if ("number" != typeof subsecDigits) {
      if ("auto" === toString(subsecDigits)) {
        return;
      }
      throw new RangeError(invalidEntity(subsecDigitsName, subsecDigits));
    }
    subsecDigits = clampEntity(subsecDigitsName, Math.floor(subsecDigits), 0, 9, 1);
  }
  return subsecDigits;
}

function normalizeOptions(options) {
  return void 0 === options ? {} : requireObjectLike(options);
}

function normalizeOptionsOrString(options, optionName) {
  return "string" == typeof options ? {
    [optionName]: options
  } : requireObjectLike(options);
}

function copyOptions(options) {
  if (void 0 !== options) {
    if (isObjectLike(options)) {
      return Object.assign(Object.create(null), options);
    }
    throw new TypeError(invalidObject);
  }
}

function overrideOverflowOptions(options, overflow) {
  return options && Object.assign(Object.create(null), options, {
    overflow: overflowMapNames[overflow]
  });
}

function refineUnitOption(optionName, options, maxUnit = 9, minUnit = 0, ensureDefined) {
  let unitStr = options[optionName];
  if (void 0 === unitStr) {
    return ensureDefined ? minUnit : void 0;
  }
  if (unitStr = toString(unitStr), "auto" === unitStr) {
    return ensureDefined ? minUnit : null;
  }
  let unit = unitNameMap[unitStr];
  if (void 0 === unit && (unit = durationFieldIndexes[unitStr]), void 0 === unit) {
    throw new RangeError(invalidChoice(optionName, unitStr, unitNameMap));
  }
  return clampEntity(optionName, unit, minUnit, maxUnit, 1, unitNamesAsc), unit;
}

function refineChoiceOption(optionName, enumNameMap, options, defaultChoice = 0) {
  const enumArg = options[optionName];
  if (void 0 === enumArg) {
    return defaultChoice;
  }
  const enumStr = toString(enumArg), enumNum = enumNameMap[enumStr];
  if (void 0 === enumNum) {
    throw new RangeError(invalidChoice(optionName, enumStr, enumNameMap));
  }
  return enumNum;
}

function checkLargestSmallestUnit(largestUnit, smallestUnit) {
  if (smallestUnit > largestUnit) {
    throw new RangeError(flippedSmallestLargestUnit);
  }
}

function createInstantSlots(epochNano) {
  return {
    branding: InstantBranding,
    epochNanoseconds: epochNano
  };
}

function createZonedDateTimeSlots(epochNano, timeZone, calendar) {
  return {
    branding: ZonedDateTimeBranding,
    calendar: calendar,
    timeZone: timeZone,
    epochNanoseconds: epochNano
  };
}

function createPlainDateTimeSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainDateTimeBranding,
    calendar: calendar,
    ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields)
  };
}

function createPlainDateSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainDateBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainYearMonthSlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainYearMonthBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainMonthDaySlots(isoFields, calendar = isoFields.calendar) {
  return {
    branding: PlainMonthDayBranding,
    calendar: calendar,
    ...pluckProps(isoDateFieldNamesAlpha, isoFields)
  };
}

function createPlainTimeSlots(isoFields) {
  return {
    branding: PlainTimeBranding,
    ...pluckProps(isoTimeFieldNamesAlpha, isoFields)
  };
}

function createDurationSlots(durationFields) {
  return {
    branding: DurationBranding,
    sign: computeDurationSign(durationFields),
    ...pluckProps(durationFieldNamesAlpha, durationFields)
  };
}

function getEpochMilli(slots) {
  return divModBigNano(slots.epochNanoseconds, nanoInMilli)[0];
}

function extractEpochNano(slots) {
  return slots.epochNanoseconds;
}

function getId(idLike) {
  return "string" == typeof idLike ? idLike : requireString(idLike.id);
}

function isIdLikeEqual(idLike0, idLike1) {
  return idLike0 === idLike1 || getId(idLike0) === getId(idLike1);
}

function totalDayTimeDuration(durationFields, totalUnit) {
  return bigNanoToNumber(durationFieldsToBigNano(durationFields), unitNanoMap[totalUnit], 1);
}

function clampRelativeDuration(calendarOps, durationFields, clampUnit, clampDistance, marker, markerToEpochNano, moveMarker) {
  const unitName = durationFieldNamesAsc[clampUnit], durationPlusDistance = {
    ...durationFields,
    [unitName]: durationFields[unitName] + clampDistance
  }, marker0 = moveMarker(calendarOps, marker, durationFields), marker1 = moveMarker(calendarOps, marker, durationPlusDistance);
  return [ markerToEpochNano(marker0), markerToEpochNano(marker1) ];
}

function computeEpochNanoFrac(epochNanoProgress, epochNano0, epochNano1) {
  const denom = bigNanoToNumber(diffBigNanos(epochNano0, epochNano1));
  if (!denom) {
    throw new RangeError(invalidProtocolResults);
  }
  return bigNanoToNumber(diffBigNanos(epochNano0, epochNanoProgress)) / denom;
}

function roundDateTime(isoFields, smallestUnit, roundingInc, roundingMode) {
  return roundDateTimeToNano(isoFields, computeNanoInc(smallestUnit, roundingInc), roundingMode);
}

function roundDateTimeToNano(isoFields, nanoInc, roundingMode) {
  const [roundedIsoFields, dayDelta] = roundTimeToNano(isoFields, nanoInc, roundingMode);
  return checkIsoDateTimeInBounds({
    ...moveByDays(isoFields, dayDelta),
    ...roundedIsoFields
  });
}

function roundTimeToNano(isoFields, nanoInc, roundingMode) {
  return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(isoFields), nanoInc, roundingMode));
}

function roundToMinute(offsetNano) {
  return roundByInc(offsetNano, nanoInMinute, 7);
}

function computeNanoInc(smallestUnit, roundingInc) {
  return unitNanoMap[smallestUnit] * roundingInc;
}

function computeDayInterval(isoFields) {
  const isoFields0 = computeDayFloor(isoFields);
  return [ isoFields0, moveByDays(isoFields0, 1) ];
}

function computeDayFloor(isoFields) {
  return clearIsoFields(6, isoFields);
}

function roundDayTimeDurationByInc(durationFields, nanoInc, roundingMode) {
  const maxUnit = Math.min(getMaxDurationUnit(durationFields), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(durationFields, maxUnit), nanoInc, roundingMode), maxUnit);
}

function roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  if (0 === smallestUnit && 1 === roundingInc) {
    return durationFields;
  }
  const nudgeFunc = isUniformUnit(smallestUnit, marker) ? isZonedEpochSlots(marker) && smallestUnit < 6 && largestUnit >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [roundedDurationFields, roundedEpochNano, grewBigUnit] = nudgeFunc(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker);
  return grewBigUnit && 7 !== smallestUnit && (roundedDurationFields = ((durationFields, endEpochNano, largestUnit, smallestUnit, calendarOps, marker, markerToEpochNano, moveMarker) => {
    const sign = computeDurationSign(durationFields);
    for (let currentUnit = smallestUnit + 1; currentUnit <= largestUnit; currentUnit++) {
      if (7 === currentUnit && 7 !== largestUnit) {
        continue;
      }
      const baseDurationFields = clearDurationFields(currentUnit, durationFields);
      baseDurationFields[durationFieldNamesAsc[currentUnit]] += sign;
      const beyondThresholdNano = bigNanoToNumber(diffBigNanos(markerToEpochNano(moveMarker(calendarOps, marker, baseDurationFields)), endEpochNano));
      if (beyondThresholdNano && Math.sign(beyondThresholdNano) !== sign) {
        break;
      }
      durationFields = baseDurationFields;
    }
    return durationFields;
  })(roundedDurationFields, roundedEpochNano, largestUnit, Math.max(6, smallestUnit), calendarOps, marker, markerToEpochNano, moveMarker)), 
  roundedDurationFields;
}

function roundBigNano(bigNano, smallestUnit, roundingInc, roundingMode, useDayOrigin) {
  if (6 === smallestUnit) {
    const daysExact = (bigNano => bigNano[0] + bigNano[1] / nanoInUtcDay)(bigNano);
    return [ roundByInc(daysExact, roundingInc, roundingMode), 0 ];
  }
  return roundBigNanoByInc(bigNano, computeNanoInc(smallestUnit, roundingInc), roundingMode, useDayOrigin);
}

function roundBigNanoByInc(bigNano, nanoInc, roundingMode, useDayOrigin) {
  let [days, timeNano] = bigNano;
  useDayOrigin && timeNano < 0 && (timeNano += nanoInUtcDay, days -= 1);
  const [dayDelta, roundedTimeNano] = divModFloor(roundByInc(timeNano, nanoInc, roundingMode), nanoInUtcDay);
  return createBigNano(days + dayDelta, roundedTimeNano);
}

function roundByInc(num, inc, roundingMode) {
  return roundWithMode(num / inc, roundingMode) * inc;
}

function roundWithMode(num, roundingMode) {
  return roundingModeFuncs[roundingMode](num);
}

function nudgeDayTimeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  const sign = computeDurationSign(durationFields), bigNano = durationFieldsToBigNano(durationFields), roundedBigNano = roundBigNano(bigNano, smallestUnit, roundingInc, roundingMode), nanoDiff = diffBigNanos(bigNano, roundedBigNano), expandedBigUnit = Math.sign(roundedBigNano[0] - bigNano[0]) === sign, roundedDayTimeFields = nanoToDurationDayTimeFields(roundedBigNano, Math.min(largestUnit, 6));
  return [ {
    ...durationFields,
    ...roundedDayTimeFields
  }, addBigNanos(endEpochNano, nanoDiff), expandedBigUnit ];
}

function nudgeZonedTimeDuration(durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  const sign = computeDurationSign(durationFields), timeNano = bigNanoToNumber(durationFieldsToBigNano(durationFields, 5)), nanoInc = computeNanoInc(smallestUnit, roundingInc);
  let roundedTimeNano = roundByInc(timeNano, nanoInc, roundingMode);
  const [dayEpochNano0, dayEpochNano1] = clampRelativeDuration(calendarOps, {
    ...durationFields,
    ...durationTimeFieldDefaults
  }, 6, sign, marker, markerToEpochNano, moveMarker), beyondDayNano = roundedTimeNano - bigNanoToNumber(diffBigNanos(dayEpochNano0, dayEpochNano1));
  let dayDelta = 0;
  beyondDayNano && Math.sign(beyondDayNano) !== sign ? endEpochNano = moveBigNano(dayEpochNano0, roundedTimeNano) : (dayDelta += sign, 
  roundedTimeNano = roundByInc(beyondDayNano, nanoInc, roundingMode), endEpochNano = moveBigNano(dayEpochNano1, roundedTimeNano));
  const durationTimeFields = nanoToDurationTimeFields(roundedTimeNano);
  return [ {
    ...durationFields,
    ...durationTimeFields,
    days: durationFields.days + dayDelta
  }, endEpochNano, Boolean(dayDelta) ];
}

function nudgeRelativeDuration(durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker) {
  const sign = computeDurationSign(durationFields), smallestUnitFieldName = durationFieldNamesAsc[smallestUnit], baseDurationFields = clearDurationFields(smallestUnit, durationFields);
  7 === smallestUnit && (durationFields = {
    ...durationFields,
    weeks: durationFields.weeks + Math.trunc(durationFields.days / 7)
  });
  const truncedVal = divTrunc(durationFields[smallestUnitFieldName], roundingInc) * roundingInc;
  baseDurationFields[smallestUnitFieldName] = truncedVal;
  const [epochNano0, epochNano1] = clampRelativeDuration(calendarOps, baseDurationFields, smallestUnit, roundingInc * sign, marker, markerToEpochNano, moveMarker), exactVal = truncedVal + computeEpochNanoFrac(endEpochNano, epochNano0, epochNano1) * sign * roundingInc, roundedVal = roundByInc(exactVal, roundingInc, roundingMode), expanded = Math.sign(roundedVal - exactVal) === sign;
  return baseDurationFields[smallestUnitFieldName] = roundedVal, [ baseDurationFields, expanded ? epochNano1 : epochNano0, expanded ];
}

function formatDateLikeIso(calendarIdLike, formatSimple, isoFields, calendarDisplay) {
  const calendarId = getId(calendarIdLike), showCalendar = calendarDisplay > 1 || 0 === calendarDisplay && calendarId !== isoCalendarId;
  return 1 === calendarDisplay ? calendarId === isoCalendarId ? formatSimple(isoFields) : formatIsoDateFields(isoFields) : showCalendar ? formatIsoDateFields(isoFields) + formatCalendarId(calendarId, 2 === calendarDisplay) : formatSimple(isoFields);
}

function formatDurationFragments(fragObj) {
  const parts = [];
  for (const fragName in fragObj) {
    const fragVal = fragObj[fragName];
    fragVal && parts.push(fragVal, fragName);
  }
  return parts.join("");
}

function formatIsoDateTimeFields(isoDateTimeFields, subsecDigits) {
  return formatIsoDateFields(isoDateTimeFields) + "T" + formatIsoTimeFields(isoDateTimeFields, subsecDigits);
}

function formatIsoDateFields(isoDateFields) {
  return formatIsoYearMonthFields(isoDateFields) + "-" + padNumber2(isoDateFields.isoDay);
}

function formatIsoYearMonthFields(isoDateFields) {
  const {isoYear: isoYear} = isoDateFields;
  return (isoYear < 0 || isoYear > 9999 ? getSignStr(isoYear) + padNumber(6, Math.abs(isoYear)) : padNumber(4, isoYear)) + "-" + padNumber2(isoDateFields.isoMonth);
}

function formatIsoMonthDayFields(isoDateFields) {
  return padNumber2(isoDateFields.isoMonth) + "-" + padNumber2(isoDateFields.isoDay);
}

function formatIsoTimeFields(isoTimeFields, subsecDigits) {
  const parts = [ padNumber2(isoTimeFields.isoHour), padNumber2(isoTimeFields.isoMinute) ];
  return -1 !== subsecDigits && parts.push(padNumber2(isoTimeFields.isoSecond) + ((isoMillisecond, isoMicrosecond, isoNanosecond, subsecDigits) => formatSubsecNano(isoMillisecond * nanoInMilli + isoMicrosecond * nanoInMicro + isoNanosecond, subsecDigits))(isoTimeFields.isoMillisecond, isoTimeFields.isoMicrosecond, isoTimeFields.isoNanosecond, subsecDigits)), 
  parts.join(":");
}

function formatOffsetNano(offsetNano, offsetDisplay = 0) {
  if (1 === offsetDisplay) {
    return "";
  }
  const [hour, nanoRemainder0] = divModFloor(Math.abs(offsetNano), nanoInHour), [minute, nanoRemainder1] = divModFloor(nanoRemainder0, nanoInMinute), [second, nanoRemainder2] = divModFloor(nanoRemainder1, nanoInSec);
  return getSignStr(offsetNano) + padNumber2(hour) + ":" + padNumber2(minute) + (second || nanoRemainder2 ? ":" + padNumber2(second) + formatSubsecNano(nanoRemainder2) : "");
}

function formatCalendar(calendarIdLike, calendarDisplay) {
  if (1 !== calendarDisplay) {
    const calendarId = getId(calendarIdLike);
    if (calendarDisplay > 1 || 0 === calendarDisplay && calendarId !== isoCalendarId) {
      return formatCalendarId(calendarId, 2 === calendarDisplay);
    }
  }
  return "";
}

function formatCalendarId(calendarId, isCritical) {
  return "[" + (isCritical ? "!" : "") + "u-ca=" + calendarId + "]";
}

function formatSubsecNano(totalNano, subsecDigits) {
  let s = padNumber(9, totalNano);
  return s = void 0 === subsecDigits ? s.replace(trailingZerosRE, "") : s.slice(0, subsecDigits), 
  s ? "." + s : "";
}

function getSignStr(num) {
  return num < 0 ? "-" : "+";
}

function formatDurationNumber(n, force) {
  return n || force ? n.toLocaleString("fullwide", {
    useGrouping: 0
  }) : "";
}

function getMatchingInstantFor(timeZoneOps, isoFields, offsetNano, offsetDisambig = 0, epochDisambig = 0, epochFuzzy, hasZ) {
  if (void 0 !== offsetNano && 1 === offsetDisambig && (1 === offsetDisambig || hasZ)) {
    return isoToEpochNanoWithOffset(isoFields, offsetNano);
  }
  const possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields);
  if (void 0 !== offsetNano && 3 !== offsetDisambig) {
    const matchingEpochNano = ((possibleEpochNanos, isoDateTimeFields, offsetNano, fuzzy) => {
      const zonedEpochNano = isoToEpochNano(isoDateTimeFields);
      fuzzy && (offsetNano = roundToMinute(offsetNano));
      for (const possibleEpochNano of possibleEpochNanos) {
        let possibleOffsetNano = bigNanoToNumber(diffBigNanos(possibleEpochNano, zonedEpochNano));
        if (fuzzy && (possibleOffsetNano = roundToMinute(possibleOffsetNano)), possibleOffsetNano === offsetNano) {
          return possibleEpochNano;
        }
      }
    })(possibleEpochNanos, isoFields, offsetNano, epochFuzzy);
    if (void 0 !== matchingEpochNano) {
      return matchingEpochNano;
    }
    if (0 === offsetDisambig) {
      throw new RangeError(invalidOffsetForTimeZone);
    }
  }
  return hasZ ? isoToEpochNano(isoFields) : getSingleInstantFor(timeZoneOps, isoFields, epochDisambig, possibleEpochNanos);
}

function getSingleInstantFor(timeZoneOps, isoFields, disambig = 0, possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields)) {
  if (1 === possibleEpochNanos.length) {
    return possibleEpochNanos[0];
  }
  if (1 === disambig) {
    throw new RangeError(ambigOffset);
  }
  if (possibleEpochNanos.length) {
    return possibleEpochNanos[3 === disambig ? 1 : 0];
  }
  const zonedEpochNano = isoToEpochNano(isoFields), gapNano = ((timeZoneOps, zonedEpochNano) => {
    const startOffsetNano = timeZoneOps.getOffsetNanosecondsFor(moveBigNano(zonedEpochNano, -nanoInUtcDay));
    return validateTimeZoneGap(timeZoneOps.getOffsetNanosecondsFor(moveBigNano(zonedEpochNano, nanoInUtcDay)) - startOffsetNano);
  })(timeZoneOps, zonedEpochNano), shiftNano = gapNano * (2 === disambig ? -1 : 1);
  return (possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(epochNanoToIso(zonedEpochNano, shiftNano)))[2 === disambig ? 0 : possibleEpochNanos.length - 1];
}

function validateTimeZoneOffset(offsetNano) {
  if (Math.abs(offsetNano) >= nanoInUtcDay) {
    throw new RangeError(outOfBoundsOffset);
  }
  return offsetNano;
}

function validateTimeZoneGap(gapNano) {
  if (gapNano > nanoInUtcDay) {
    throw new RangeError(outOfBoundsDstGap);
  }
  return gapNano;
}

function moveZonedEpochs(timeZoneOps, calendarOps, slots, durationFields, options) {
  const timeOnlyNano = durationFieldsToBigNano(durationFields, 5);
  let epochNano = slots.epochNanoseconds;
  if (durationHasDateParts(durationFields)) {
    const isoDateTimeFields = zonedEpochSlotsToIso(slots, timeZoneOps);
    epochNano = addBigNanos(getSingleInstantFor(timeZoneOps, {
      ...moveDate(calendarOps, isoDateTimeFields, {
        ...durationFields,
        ...durationTimeFieldDefaults
      }, options),
      ...pluckProps(isoTimeFieldNamesAsc, isoDateTimeFields)
    }), timeOnlyNano);
  } else {
    epochNano = addBigNanos(epochNano, timeOnlyNano), refineOverflowOptions(options);
  }
  return {
    epochNanoseconds: checkEpochNanoInBounds(epochNano)
  };
}

function moveDateTime(calendarOps, isoDateTimeFields, durationFields, options) {
  const [movedIsoTimeFields, dayDelta] = moveTime(isoDateTimeFields, durationFields);
  return checkIsoDateTimeInBounds({
    ...moveDate(calendarOps, isoDateTimeFields, {
      ...durationFields,
      ...durationTimeFieldDefaults,
      days: durationFields.days + dayDelta
    }, options),
    ...movedIsoTimeFields
  });
}

function moveDate(calendarOps, isoDateFields, durationFields, options) {
  if (durationFields.years || durationFields.months || durationFields.weeks) {
    return calendarOps.dateAdd(isoDateFields, durationFields, options);
  }
  refineOverflowOptions(options);
  const days = durationFields.days + durationFieldsToBigNano(durationFields, 5)[0];
  return days ? checkIsoDateInBounds(moveByDays(isoDateFields, days)) : isoDateFields;
}

function moveToDayOfMonthUnsafe(calendarOps, isoFields, dayOfMonth = 1) {
  return moveByDays(isoFields, dayOfMonth - calendarOps.day(isoFields));
}

function moveTime(isoFields, durationFields) {
  const [durDays, durTimeNano] = durationFieldsToBigNano(durationFields, 5), [newIsoFields, overflowDays] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) + durTimeNano);
  return [ newIsoFields, durDays + overflowDays ];
}

function moveByDays(isoFields, days) {
  return days ? {
    ...isoFields,
    ...epochMilliToIso(isoToEpochMilli(isoFields) + days * milliInDay)
  } : isoFields;
}

function createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots) {
  const calendarOps = getCalendarOps(relativeToSlots.calendar);
  return isZonedEpochSlots(relativeToSlots) ? [ relativeToSlots, calendarOps, getTimeZoneOps(relativeToSlots.timeZone) ] : [ {
    ...relativeToSlots,
    ...isoTimeFieldDefaults
  }, calendarOps ];
}

function createMarkerToEpochNano(timeZoneOps) {
  return timeZoneOps ? extractEpochNano : isoToEpochNano;
}

function createMoveMarker(timeZoneOps) {
  return timeZoneOps ? bindArgs(moveZonedEpochs, timeZoneOps) : moveDateTime;
}

function createDiffMarkers(timeZoneOps) {
  return timeZoneOps ? bindArgs(diffZonedEpochsExact, timeZoneOps) : diffDateTimesExact;
}

function isZonedEpochSlots(marker) {
  return marker && marker.epochNanoseconds;
}

function isUniformUnit(unit, marker) {
  return unit <= 6 - (isZonedEpochSlots(marker) ? 1 : 0);
}

function negateDuration(slots) {
  return createDurationSlots(negateDurationFields(slots));
}

function negateDurationFields(fields) {
  const res = {};
  for (const fieldName of durationFieldNamesAsc) {
    res[fieldName] = -1 * fields[fieldName] || 0;
  }
  return res;
}

function computeDurationSign(fields, fieldNames = durationFieldNamesAsc) {
  let sign = 0;
  for (const fieldName of fieldNames) {
    const fieldSign = Math.sign(fields[fieldName]);
    if (fieldSign) {
      if (sign && sign !== fieldSign) {
        throw new RangeError(forbiddenDurationSigns);
      }
      sign = fieldSign;
    }
  }
  return sign;
}

function checkDurationUnits(fields) {
  for (const calendarUnit of durationCalendarFieldNamesAsc) {
    clampEntity(calendarUnit, fields[calendarUnit], -maxCalendarUnit, maxCalendarUnit, 1);
  }
  return checkDurationTimeUnit(bigNanoToNumber(durationFieldsToBigNano(fields), nanoInSec)), 
  fields;
}

function checkDurationTimeUnit(n) {
  if (!Number.isSafeInteger(n)) {
    throw new RangeError(outOfBoundsDuration);
  }
}

function durationFieldsToBigNano(fields, largestUnit = 6) {
  return givenFieldsToBigNano(fields, largestUnit, durationFieldNamesAsc);
}

function nanoToDurationDayTimeFields(bigNano, largestUnit = 6) {
  const [days, timeNano] = bigNano, dayTimeFields = nanoToGivenFields(timeNano, largestUnit, durationFieldNamesAsc);
  if (dayTimeFields[durationFieldNamesAsc[largestUnit]] += days * (nanoInUtcDay / unitNanoMap[largestUnit]), 
  !Number.isFinite(dayTimeFields[durationFieldNamesAsc[largestUnit]])) {
    throw new RangeError(outOfBoundsDate);
  }
  return dayTimeFields;
}

function nanoToDurationTimeFields(nano, largestUnit = 5) {
  return nanoToGivenFields(nano, largestUnit, durationFieldNamesAsc);
}

function durationHasDateParts(fields) {
  return Boolean(computeDurationSign(fields, durationDateFieldNamesAsc));
}

function getMaxDurationUnit(fields) {
  let unit = 9;
  for (;unit > 0 && !fields[durationFieldNamesAsc[unit]]; unit--) {}
  return unit;
}

function createSplitTuple(startEpochSec, endEpochSec) {
  return [ startEpochSec, endEpochSec ];
}

function computePeriod(epochSec) {
  const startEpochSec = Math.floor(epochSec / periodDur) * periodDur;
  return [ startEpochSec, startEpochSec + periodDur ];
}

function parseOffsetNano(s) {
  const offsetNano = parseOffsetNanoMaybe(s);
  if (void 0 === offsetNano) {
    throw new RangeError(failedParse(s));
  }
  return offsetNano;
}

function parsePlainDate(s) {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized || organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return createPlainDateSlots(organized.hasTime ? finalizeDateTime(organized) : finalizeDate(organized));
}

function requireIsoCalendar(organized) {
  if (organized.calendar !== isoCalendarId) {
    throw new RangeError(invalidSubstring(organized.calendar));
  }
}

function finalizeZonedDateTime(organized, offsetNano, offsetDisambig = 0, epochDisambig = 0) {
  const slotId = resolveTimeZoneId(organized.timeZone), timeZoneImpl = queryNativeTimeZone(slotId);
  return createZonedDateTimeSlots(getMatchingInstantFor(timeZoneImpl, checkIsoDateTimeFields(organized), offsetNano, offsetDisambig, epochDisambig, !timeZoneImpl.offsetNano, organized.hasZ), slotId, resolveCalendarId(organized.calendar));
}

function finalizeDateTime(organized) {
  return resolveSlotsCalendar(checkIsoDateTimeInBounds(checkIsoDateTimeFields(organized)));
}

function finalizeDate(organized) {
  return resolveSlotsCalendar(checkIsoDateInBounds(checkIsoDateFields(organized)));
}

function resolveSlotsCalendar(organized) {
  return {
    ...organized,
    calendar: resolveCalendarId(organized.calendar)
  };
}

function parseDateTimeLike(s) {
  const parts = dateTimeRegExp.exec(s);
  return parts ? (parts => {
    const zOrOffset = parts[10], hasZ = "Z" === (zOrOffset || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(parts),
      isoMonth: parseInt(parts[4]),
      isoDay: parseInt(parts[5]),
      ...organizeTimeParts(parts.slice(5)),
      ...organizeAnnotationParts(parts[16]),
      hasTime: Boolean(parts[6]),
      hasZ: hasZ,
      offset: hasZ ? void 0 : zOrOffset
    };
  })(parts) : void 0;
}

function parseYearMonthOnly(s) {
  const parts = yearMonthRegExp.exec(s);
  return parts ? (parts => ({
    isoYear: organizeIsoYearParts(parts),
    isoMonth: parseInt(parts[4]),
    isoDay: 1,
    ...organizeAnnotationParts(parts[5])
  }))(parts) : void 0;
}

function parseMonthDayOnly(s) {
  const parts = monthDayRegExp.exec(s);
  return parts ? (parts => ({
    isoYear: isoEpochFirstLeapYear,
    isoMonth: parseInt(parts[1]),
    isoDay: parseInt(parts[2]),
    ...organizeAnnotationParts(parts[3])
  }))(parts) : void 0;
}

function parseOffsetNanoMaybe(s, onlyHourMinute) {
  const parts = offsetRegExp.exec(s);
  return parts ? ((parts, onlyHourMinute) => {
    const firstSubMinutePart = parts[4] || parts[5];
    if (onlyHourMinute && firstSubMinutePart) {
      throw new RangeError(invalidSubstring(firstSubMinutePart));
    }
    return validateTimeZoneOffset((parseInt0(parts[2]) * nanoInHour + parseInt0(parts[3]) * nanoInMinute + parseInt0(parts[4]) * nanoInSec + parseSubsecNano(parts[5] || "")) * parseSign(parts[1]));
  })(parts, onlyHourMinute) : void 0;
}

function organizeIsoYearParts(parts) {
  const yearSign = parseSign(parts[1]), year = parseInt(parts[2] || parts[3]);
  if (yearSign < 0 && !year) {
    throw new RangeError(invalidSubstring(-0));
  }
  return yearSign * year;
}

function organizeTimeParts(parts) {
  const isoSecond = parseInt0(parts[3]);
  return {
    ...nanoToIsoTimeAndDay(parseSubsecNano(parts[4] || ""))[0],
    isoHour: parseInt0(parts[1]),
    isoMinute: parseInt0(parts[2]),
    isoSecond: 60 === isoSecond ? 59 : isoSecond
  };
}

function organizeAnnotationParts(s) {
  let calendarIsCritical, timeZoneId;
  const calendarIds = [];
  if (s.replace(annotationRegExp, ((whole, criticalStr, mainStr) => {
    const isCritical = Boolean(criticalStr), [val, name] = mainStr.split("=").reverse();
    if (name) {
      if ("u-ca" === name) {
        calendarIds.push(val), calendarIsCritical || (calendarIsCritical = isCritical);
      } else if (isCritical || /[A-Z]/.test(name)) {
        throw new RangeError(invalidSubstring(whole));
      }
    } else {
      if (timeZoneId) {
        throw new RangeError(invalidSubstring(whole));
      }
      timeZoneId = val;
    }
    return "";
  })), calendarIds.length > 1 && calendarIsCritical) {
    throw new RangeError(invalidSubstring(s));
  }
  return {
    timeZone: timeZoneId,
    calendar: calendarIds[0] || isoCalendarId
  };
}

function parseSubsecNano(fracStr) {
  return parseInt(fracStr.padEnd(9, "0"));
}

function createRegExp(meat) {
  return new RegExp(`^${meat}$`, "i");
}

function parseSign(s) {
  return s && "+" !== s ? -1 : 1;
}

function parseInt0(s) {
  return void 0 === s ? 0 : parseInt(s);
}

function resolveTimeZoneId(id) {
  const essence = getTimeZoneEssence(id);
  return "number" == typeof essence ? formatOffsetNano(essence) : essence ? (id => {
    if (icuRegExp.test(id)) {
      throw new RangeError(forbiddenIcuTimeZone);
    }
    return id.toLowerCase().split("/").map(((part, partI) => (part.length <= 3 || /\d/.test(part)) && !/etc|yap/.test(part) ? part.toUpperCase() : part.replace(/baja|dumont|[a-z]+/g, ((a, i) => a.length <= 2 && !partI || "in" === a || "chat" === a ? a.toUpperCase() : a.length > 2 || !i ? capitalize(a).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : a)))).join("/");
  })(id) : utcTimeZoneId;
}

function getTimeZoneAtomic(id) {
  const essence = getTimeZoneEssence(id);
  return "number" == typeof essence ? essence : essence ? essence.resolvedOptions().timeZone : utcTimeZoneId;
}

function getTimeZoneEssence(id) {
  const offsetNano = parseOffsetNanoMaybe(id = id.toUpperCase(), 1);
  return void 0 !== offsetNano ? offsetNano : id !== utcTimeZoneId ? queryTimeZoneIntlFormat(id) : void 0;
}

function compareInstants(instantSlots0, instantSlots1) {
  return compareBigNanos(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds);
}

function compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) {
  return compareBigNanos(zonedDateTimeSlots0.epochNanoseconds, zonedDateTimeSlots1.epochNanoseconds);
}

function compareIsoDateTimeFields(isoFields0, isoFields1) {
  return compareIsoDateFields(isoFields0, isoFields1) || compareIsoTimeFields(isoFields0, isoFields1);
}

function compareIsoDateFields(isoFields0, isoFields1) {
  return compareNumbers(isoToEpochMilli(isoFields0), isoToEpochMilli(isoFields1));
}

function compareIsoTimeFields(isoFields0, isoFields1) {
  return compareNumbers(isoTimeFieldsToNano(isoFields0), isoTimeFieldsToNano(isoFields1));
}

function isTimeZoneSlotsEqual(a, b) {
  if (a === b) {
    return 1;
  }
  const aId = getId(a), bId = getId(b);
  if (aId === bId) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(aId) === getTimeZoneAtomic(bId);
  } catch (_a) {}
}

function diffDateLike(invert, getCalendarOps, startIsoFields, endIsoFields, largestUnit, smallestUnit, roundingInc, roundingMode, origOptions) {
  const startEpochNano = isoToEpochNano(startIsoFields), endEpochNano = isoToEpochNano(endIsoFields);
  let durationFields;
  if (compareBigNanos(endEpochNano, startEpochNano)) {
    if (6 === largestUnit) {
      durationFields = diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const calendarOps = getCalendarOps();
      durationFields = calendarOps.dateUntil(startIsoFields, endIsoFields, largestUnit, origOptions), 
      6 === smallestUnit && 1 === roundingInc || (durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, startIsoFields, isoToEpochNano, moveDate));
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}

function diffZonedEpochsExact(timeZoneOps, calendarOps, slots0, slots1, largestUnit, origOptions) {
  const sign = compareBigNanos(slots1.epochNanoseconds, slots0.epochNanoseconds);
  return sign ? largestUnit < 6 ? diffEpochNanosExact(slots0.epochNanoseconds, slots1.epochNanoseconds, largestUnit) : diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, origOptions) : durationFieldDefaults;
}

function diffDateTimesExact(calendarOps, startIsoFields, endIsoFields, largestUnit, origOptions) {
  const startEpochNano = isoToEpochNano(startIsoFields), endEpochNano = isoToEpochNano(endIsoFields), sign = compareBigNanos(endEpochNano, startEpochNano);
  return sign ? largestUnit <= 6 ? diffEpochNanosExact(startEpochNano, endEpochNano, largestUnit) : diffDateTimesBig(calendarOps, startIsoFields, endIsoFields, sign, largestUnit, origOptions) : durationFieldDefaults;
}

function diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, origOptions) {
  const [isoFields0, isoFields1, remainderNano] = ((timeZoneOps, slots0, slots1, sign) => {
    function updateMid() {
      return midIsoFields = {
        ...moveByDays(endIsoFields, dayCorrection++ * -sign),
        ...startIsoTimeFields
      }, midEpochNano = getSingleInstantFor(timeZoneOps, midIsoFields), compareBigNanos(endEpochNano, midEpochNano) === -sign;
    }
    const startIsoFields = zonedEpochSlotsToIso(slots0, timeZoneOps), startIsoTimeFields = pluckProps(isoTimeFieldNamesAsc, startIsoFields), endIsoFields = zonedEpochSlotsToIso(slots1, timeZoneOps), endEpochNano = slots1.epochNanoseconds;
    let dayCorrection = 0;
    const timeDiffNano = diffTimes(startIsoFields, endIsoFields);
    let midIsoFields, midEpochNano;
    if (Math.sign(timeDiffNano) === -sign && dayCorrection++, updateMid() && (-1 === sign || updateMid())) {
      throw new RangeError(invalidProtocolResults);
    }
    const remainderNano = bigNanoToNumber(diffBigNanos(midEpochNano, endEpochNano));
    return [ startIsoFields, midIsoFields, remainderNano ];
  })(timeZoneOps, slots0, slots1, sign);
  var startIsoFields, endIsoFields;
  return {
    ...6 === largestUnit ? (startIsoFields = isoFields0, endIsoFields = isoFields1, 
    {
      ...durationFieldDefaults,
      days: diffDays(startIsoFields, endIsoFields)
    }) : calendarOps.dateUntil(isoFields0, isoFields1, largestUnit, origOptions),
    ...nanoToDurationTimeFields(remainderNano)
  };
}

function diffDateTimesBig(calendarOps, startIsoFields, endIsoFields, sign, largestUnit, origOptions) {
  const [startIsoDate, endIsoDate, timeNano] = ((startIsoDateTime, endIsoDateTime, sign) => {
    let endIsoDate = endIsoDateTime, timeDiffNano = diffTimes(startIsoDateTime, endIsoDateTime);
    return Math.sign(timeDiffNano) === -sign && (endIsoDate = moveByDays(endIsoDateTime, -sign), 
    timeDiffNano += nanoInUtcDay * sign), [ startIsoDateTime, endIsoDate, timeDiffNano ];
  })(startIsoFields, endIsoFields, sign);
  return {
    ...calendarOps.dateUntil(startIsoDate, endIsoDate, largestUnit, origOptions),
    ...nanoToDurationTimeFields(timeNano)
  };
}

function diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  return {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(roundBigNano(diffBigNanos(startEpochNano, endEpochNano), smallestUnit, roundingInc, roundingMode), largestUnit)
  };
}

function diffEpochNanosExact(startEpochNano, endEpochNano, largestUnit) {
  return {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(diffBigNanos(startEpochNano, endEpochNano), largestUnit)
  };
}

function diffDays(startIsoFields, endIsoFields) {
  return diffEpochMilliByDay(isoToEpochMilli(startIsoFields), isoToEpochMilli(endIsoFields));
}

function diffEpochMilliByDay(epochMilli0, epochMilli1) {
  return Math.trunc((epochMilli1 - epochMilli0) / milliInDay);
}

function diffTimes(isoTime0, isoTime1) {
  return isoTimeFieldsToNano(isoTime1) - isoTimeFieldsToNano(isoTime0);
}

function getCommonCalendarSlot(a, b) {
  if (!isIdLikeEqual(a, b)) {
    throw new RangeError(mismatchingCalendars);
  }
  return a;
}

function createIntlFieldCache(epochMilliToIntlFields) {
  return memoize((isoDateFields => {
    const epochMilli = isoToEpochMilli(isoDateFields);
    return epochMilliToIntlFields(epochMilli);
  }), WeakMap);
}

function createIntlYearDataCache(epochMilliToIntlFields) {
  const yearCorrection = epochMilliToIntlFields(0).year - isoEpochOriginYear;
  return memoize((year => {
    let intlFields, epochMilli = isoArgsToEpochMilli(year - yearCorrection);
    const millisReversed = [], monthStringsReversed = [];
    do {
      epochMilli += 400 * milliInDay;
    } while ((intlFields = epochMilliToIntlFields(epochMilli)).year <= year);
    do {
      epochMilli += (1 - intlFields.day) * milliInDay, intlFields.year === year && (millisReversed.push(epochMilli), 
      monthStringsReversed.push(intlFields.monthString)), epochMilli -= milliInDay;
    } while ((intlFields = epochMilliToIntlFields(epochMilli)).year >= year);
    return {
      monthEpochMillis: millisReversed.reverse(),
      monthStringToIndex: mapPropNamesToIndex(monthStringsReversed.reverse())
    };
  }));
}

function parseIntlYear(intlParts, calendarIdBase) {
  let era, eraYear, year = parseIntlPartsYear(intlParts);
  if (intlParts.era) {
    const eraOrigins = eraOriginsByCalendarId[calendarIdBase];
    void 0 !== eraOrigins && (era = "islamic" === calendarIdBase ? "ah" : intlParts.era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    "bc" === era || "b" === era ? era = "bce" : "ad" !== era && "a" !== era || (era = "ce"), 
    eraYear = year, year = eraYearToYear(eraYear, eraOrigins[era] || 0));
  }
  return {
    era: era,
    eraYear: eraYear,
    year: year
  };
}

function parseIntlPartsYear(intlParts) {
  return parseInt(intlParts.relatedYear || intlParts.year);
}

function computeIntlDateParts(isoFields) {
  const {year: year, monthString: monthString, day: day} = this.queryFields(isoFields), {monthStringToIndex: monthStringToIndex} = this.queryYearData(year);
  return [ year, monthStringToIndex[monthString] + 1, day ];
}

function computeIntlEpochMilli(year, month = 1, day = 1) {
  return this.queryYearData(year).monthEpochMillis[month - 1] + (day - 1) * milliInDay;
}

function computeIntlLeapMonth(year) {
  const currentMonthStrings = queryMonthStrings(this, year), prevMonthStrings = queryMonthStrings(this, year - 1), currentLength = currentMonthStrings.length;
  if (currentLength > prevMonthStrings.length) {
    const leapMonthMeta = getCalendarLeapMonthMeta(this);
    if (leapMonthMeta < 0) {
      return -leapMonthMeta;
    }
    for (let i = 0; i < currentLength; i++) {
      if (currentMonthStrings[i] !== prevMonthStrings[i]) {
        return i + 1;
      }
    }
  }
}

function computeIntlDaysInYear(year) {
  return diffEpochMilliByDay(computeIntlEpochMilli.call(this, year), computeIntlEpochMilli.call(this, year + 1));
}

function computeIntlDaysInMonth(year, month) {
  const {monthEpochMillis: monthEpochMillis} = this.queryYearData(year);
  let nextMonth = month + 1, nextMonthEpochMilli = monthEpochMillis;
  return nextMonth > monthEpochMillis.length && (nextMonth = 1, nextMonthEpochMilli = this.queryYearData(year + 1).monthEpochMillis), 
  diffEpochMilliByDay(monthEpochMillis[month - 1], nextMonthEpochMilli[nextMonth - 1]);
}

function computeIntlMonthsInYear(year) {
  return this.queryYearData(year).monthEpochMillis.length;
}

function queryMonthStrings(intlCalendar, year) {
  return Object.keys(intlCalendar.queryYearData(year).monthStringToIndex);
}

function resolveCalendarId(id) {
  if ((id = id.toLowerCase()) !== isoCalendarId && id !== gregoryCalendarId && computeCalendarIdBase(id) !== computeCalendarIdBase(queryCalendarIntlFormat(id).resolvedOptions().calendar)) {
    throw new RangeError(invalidCalendar(id));
  }
  return id;
}

function computeCalendarIdBase(id) {
  return "islamicc" === id && (id = "islamic"), id.split("-")[0];
}

function computeNativeWeekOfYear(isoFields) {
  return this.weekParts(isoFields)[0];
}

function computeNativeYearOfWeek(isoFields) {
  return this.weekParts(isoFields)[1];
}

function computeNativeDayOfYear(isoFields) {
  const [year] = this.dateParts(isoFields);
  return diffEpochMilliByDay(this.epochMilli(year), isoToEpochMilli(isoFields)) + 1;
}

function parseMonthCode(monthCode) {
  const m = monthCodeRegExp.exec(monthCode);
  if (!m) {
    throw new RangeError(invalidMonthCode(monthCode));
  }
  return [ parseInt(m[1]), Boolean(m[2]) ];
}

function monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, leapMonth) {
  return monthCodeNumber + (isLeapMonth || leapMonth && monthCodeNumber >= leapMonth ? 1 : 0);
}

function monthToMonthCodeNumber(month, leapMonth) {
  return month - (leapMonth && month >= leapMonth ? 1 : 0);
}

function eraYearToYear(eraYear, eraOrigin) {
  return (eraOrigin + eraYear) * (Math.sign(eraOrigin) || 1) || 0;
}

function getCalendarEraOrigins(native) {
  return eraOriginsByCalendarId[getCalendarIdBase(native)];
}

function getCalendarLeapMonthMeta(native) {
  return leapMonthMetas[getCalendarIdBase(native)];
}

function getCalendarIdBase(native) {
  return computeCalendarIdBase(native.id || isoCalendarId);
}

function refineCalendarFields(calendarOps, bag, validFieldNames, requiredFieldNames = [], forcedValidFieldNames = []) {
  return refineFields(bag, [ ...calendarOps.fields(validFieldNames), ...forcedValidFieldNames ].sort(), requiredFieldNames);
}

function refineFields(bag, validFieldNames, requiredFieldNames, disallowEmpty = !requiredFieldNames) {
  const res = {};
  let prevFieldName, anyMatching = 0;
  for (const fieldName of validFieldNames) {
    if (fieldName === prevFieldName) {
      throw new RangeError(duplicateFields(fieldName));
    }
    if ("constructor" === fieldName || "__proto__" === fieldName) {
      throw new RangeError(forbiddenField(fieldName));
    }
    let fieldVal = bag[fieldName];
    if (void 0 !== fieldVal) {
      anyMatching = 1, builtinRefiners[fieldName] && (fieldVal = builtinRefiners[fieldName](fieldVal, fieldName)), 
      res[fieldName] = fieldVal;
    } else if (requiredFieldNames) {
      if (requiredFieldNames.includes(fieldName)) {
        throw new TypeError(missingField(fieldName));
      }
      res[fieldName] = timeFieldDefaults[fieldName];
    }
    prevFieldName = fieldName;
  }
  if (disallowEmpty && !anyMatching) {
    throw new TypeError(noValidFields(validFieldNames));
  }
  return res;
}

function refineTimeBag(fields, overflow) {
  return constrainIsoTimeFields(timeFieldsToIso({
    ...timeFieldDefaults,
    ...fields
  }), overflow);
}

function mergeCalendarFields(calendarOps, obj, bag, validFieldNames, forcedValidFieldNames = [], requiredObjFieldNames = []) {
  const fieldNames = [ ...calendarOps.fields(validFieldNames), ...forcedValidFieldNames ].sort();
  let fields = refineFields(obj, fieldNames, requiredObjFieldNames);
  const partialFields = refineFields(bag, fieldNames);
  return fields = calendarOps.mergeFields(fields, partialFields), refineFields(fields, fieldNames, []);
}

function convertToPlainMonthDay(calendarOps, input) {
  const fields = refineCalendarFields(calendarOps, input, monthCodeDayFieldNames);
  return calendarOps.monthDayFromFields(fields);
}

function convertToPlainYearMonth(calendarOps, input, options) {
  const fields = refineCalendarFields(calendarOps, input, yearMonthCodeFieldNames);
  return calendarOps.yearMonthFromFields(fields, options);
}

function convertToIso(calendarOps, input, inputFieldNames, extra, extraFieldNames) {
  input = pluckProps(inputFieldNames = calendarOps.fields(inputFieldNames), input), 
  extra = refineFields(extra, extraFieldNames = calendarOps.fields(extraFieldNames), []);
  let mergedFields = calendarOps.mergeFields(input, extra);
  return mergedFields = refineFields(mergedFields, [ ...inputFieldNames, ...extraFieldNames ].sort(), []), 
  calendarOps.dateFromFields(mergedFields);
}

function refineYear(calendarNative, fields) {
  let {era: era, eraYear: eraYear, year: year} = fields;
  const eraOrigins = getCalendarEraOrigins(calendarNative);
  if (void 0 !== era || void 0 !== eraYear) {
    if (void 0 === era || void 0 === eraYear) {
      throw new TypeError(mismatchingEraParts);
    }
    if (!eraOrigins) {
      throw new RangeError(forbiddenEraParts);
    }
    const eraOrigin = eraOrigins[era];
    if (void 0 === eraOrigin) {
      throw new RangeError(invalidEra(era));
    }
    const yearByEra = eraYearToYear(eraYear, eraOrigin);
    if (void 0 !== year && year !== yearByEra) {
      throw new RangeError(mismatchingYearAndEra);
    }
    year = yearByEra;
  } else if (void 0 === year) {
    throw new TypeError(missingYear(eraOrigins));
  }
  return year;
}

function refineMonth(calendarNative, fields, year, overflow) {
  let {month: month, monthCode: monthCode} = fields;
  if (void 0 !== monthCode) {
    const monthByCode = ((calendarNative, monthCode, year, overflow) => {
      const leapMonth = calendarNative.leapMonth(year), [monthCodeNumber, wantsLeapMonth] = parseMonthCode(monthCode);
      let month = monthCodeNumberToMonth(monthCodeNumber, wantsLeapMonth, leapMonth);
      if (wantsLeapMonth) {
        const leapMonthMeta = getCalendarLeapMonthMeta(calendarNative);
        if (void 0 === leapMonthMeta) {
          throw new RangeError(invalidLeapMonth);
        }
        if (leapMonthMeta > 0) {
          if (month > leapMonthMeta) {
            throw new RangeError(invalidLeapMonth);
          }
          if (void 0 === leapMonth) {
            if (1 === overflow) {
              throw new RangeError(invalidLeapMonth);
            }
            month--;
          }
        } else {
          if (month !== -leapMonthMeta) {
            throw new RangeError(invalidLeapMonth);
          }
          if (void 0 === leapMonth && 1 === overflow) {
            throw new RangeError(invalidLeapMonth);
          }
        }
      }
      return month;
    })(calendarNative, monthCode, year, overflow);
    if (void 0 !== month && month !== monthByCode) {
      throw new RangeError(mismatchingMonthAndCode);
    }
    month = monthByCode, overflow = 1;
  } else if (void 0 === month) {
    throw new TypeError(missingMonth);
  }
  return clampEntity("month", month, 1, calendarNative.monthsInYearPart(year), overflow);
}

function refineDay(calendarNative, fields, month, year, overflow) {
  return clampProp(fields, "day", 1, calendarNative.daysInMonthParts(year, month), overflow);
}

function spliceFields(dest, additional, allPropNames, deletablePropNames) {
  let anyMatching = 0;
  const nonMatchingPropNames = [];
  for (const propName of allPropNames) {
    void 0 !== additional[propName] ? anyMatching = 1 : nonMatchingPropNames.push(propName);
  }
  if (Object.assign(dest, additional), anyMatching) {
    for (const deletablePropName of deletablePropNames || nonMatchingPropNames) {
      delete dest[deletablePropName];
    }
  }
}

function getPreferredCalendarSlot(a, b) {
  if (a === b) {
    return a;
  }
  const aId = getId(a), bId = getId(b);
  if (aId === bId || aId === isoCalendarId) {
    return b;
  }
  if (bId === isoCalendarId) {
    return a;
  }
  throw new RangeError(mismatchingCalendars);
}

function createOptionsTransformer(standardNames, fallbacks, exclusions) {
  const excludedNameSet = new Set(exclusions);
  return options => (((props, names) => {
    for (const name of names) {
      if (name in props) {
        return 1;
      }
    }
    return 0;
  })(options = excludePropsByName(excludedNameSet, options), standardNames) || Object.assign(options, fallbacks), 
  exclusions && (options.timeZone = utcTimeZoneId, [ "full", "long" ].includes(options.timeStyle) && (options.timeStyle = "medium")), 
  options);
}

function createFormatForPrep(forcedTimeZoneId, locales, options, transformOptions) {
  if (options = transformOptions(options), forcedTimeZoneId) {
    if (void 0 !== options.timeZone) {
      throw new TypeError(forbiddenFormatTimeZone);
    }
    options.timeZone = forcedTimeZoneId;
  }
  return new RawDateTimeFormat(locales, options);
}

function toEpochMillis(config, resolvedOptions, slotsList) {
  const [, slotsToEpochMilli, strictCalendarCheck] = config;
  return slotsList.map((slots => (slots.calendar && ((internalCalendarId, resolvedCalendarId, strictCalendarCheck) => {
    if ((strictCalendarCheck || internalCalendarId !== isoCalendarId) && internalCalendarId !== resolvedCalendarId) {
      throw new RangeError(mismatchingCalendars);
    }
  })(getId(slots.calendar), resolvedOptions.calendar, strictCalendarCheck), slotsToEpochMilli(slots, resolvedOptions))));
}

function getCurrentEpochNano() {
  return numberToBigNano(Date.now(), nanoInMilli);
}

const expectedInteger = (entityName, num) => `Non-integer ${entityName}: ${num}`, expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`, expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`, forbiddenBigIntToNumber = entityName => `Cannot convert bigint to ${entityName}`, invalidBigInt = arg => `Invalid bigint: ${arg}`, forbiddenSymbolToString = "Cannot convert Symbol to string", invalidObject = "Invalid object", numberOutOfRange = (entityName, val, min, max, choices) => choices ? numberOutOfRange(entityName, choices[val], choices[min], choices[max]) : invalidEntity(entityName, val) + `; must be between ${min}-${max}`, invalidEntity = (fieldName, val) => `Invalid ${fieldName}: ${val}`, missingField = fieldName => `Missing ${fieldName}`, forbiddenField = fieldName => `Invalid field ${fieldName}`, duplicateFields = fieldName => `Duplicate field ${fieldName}`, noValidFields = validFields => "No valid fields: " + validFields.join(), invalidChoice = (fieldName, val, choiceMap) => invalidEntity(fieldName, val) + "; must be " + Object.keys(choiceMap).join(), forbiddenEraParts = "Forbidden era/eraYear", mismatchingEraParts = "Mismatching era/eraYear", mismatchingYearAndEra = "Mismatching year/eraYear", invalidEra = era => `Invalid era: ${era}`, missingYear = allowEra => "Missing year" + (allowEra ? "/era/eraYear" : ""), invalidMonthCode = monthCode => `Invalid monthCode: ${monthCode}`, mismatchingMonthAndCode = "Mismatching month/monthCode", missingMonth = "Missing month/monthCode", invalidLeapMonth = "Invalid leap month", invalidProtocolResults = "Invalid protocol results", mismatchingCalendars = "Mismatching Calendars", invalidCalendar = calendarId => `Invalid Calendar: ${calendarId}`, forbiddenIcuTimeZone = "Forbidden ICU TimeZone", outOfBoundsOffset = "Out-of-bounds offset", outOfBoundsDstGap = "Out-of-bounds TimeZone gap", invalidOffsetForTimeZone = "Invalid TimeZone offset", ambigOffset = "Ambiguous offset", outOfBoundsDate = "Out-of-bounds date", outOfBoundsDuration = "Out-of-bounds duration", forbiddenDurationSigns = "Cannot mix duration signs", flippedSmallestLargestUnit = "smallestUnit > largestUnit", failedParse = s => `Cannot parse: ${s}`, invalidSubstring = substring => `Invalid substring: ${substring}`, forbiddenFormatTimeZone = "Cannot specify TimeZone", mapPropNamesToIndex = bindArgs(mapPropNames, ((_propVal, i) => i)), mapPropNamesToConstant = bindArgs(mapPropNames, ((_propVal, _i, constant) => constant)), padNumber2 = bindArgs(padNumber, 2), unitNameMap = {
  nanosecond: 0,
  microsecond: 1,
  millisecond: 2,
  second: 3,
  minute: 4,
  hour: 5,
  day: 6,
  week: 7,
  month: 8,
  year: 9
}, unitNamesAsc = Object.keys(unitNameMap), milliInDay = 864e5, milliInSec = 1e3, nanoInMicro = 1e3, nanoInMilli = 1e6, nanoInSec = 1e9, nanoInMinute = 6e10, nanoInHour = 36e11, nanoInUtcDay = 864e11, unitNanoMap = [ 1, nanoInMicro, nanoInMilli, nanoInSec, nanoInMinute, nanoInHour, nanoInUtcDay ], timeFieldNamesAsc = unitNamesAsc.slice(0, 6), timeFieldNamesAlpha = sortStrings(timeFieldNamesAsc), offsetFieldNames = [ "offset" ], timeZoneFieldNames = [ "timeZone" ], timeAndOffsetFieldNames = [ ...timeFieldNamesAsc, ...offsetFieldNames ], timeAndZoneFieldNames = [ ...timeAndOffsetFieldNames, ...timeZoneFieldNames ], eraYearFieldNames = [ "era", "eraYear" ], allYearFieldNames = [ ...eraYearFieldNames, "year" ], yearFieldNames = [ "year" ], monthCodeFieldNames = [ "monthCode" ], monthFieldNames = [ "month", ...monthCodeFieldNames ], dayFieldNames = [ "day" ], yearMonthFieldNames = [ ...monthFieldNames, ...yearFieldNames ], yearMonthCodeFieldNames = [ ...monthCodeFieldNames, ...yearFieldNames ], dateFieldNamesAlpha = [ ...dayFieldNames, ...yearMonthFieldNames ], monthDayFieldNames = [ ...dayFieldNames, ...monthFieldNames ], monthCodeDayFieldNames = [ ...dayFieldNames, ...monthCodeFieldNames ], timeFieldDefaults = mapPropNamesToConstant(timeFieldNamesAsc, 0), isoCalendarId = "iso8601", gregoryCalendarId = "gregory", eraOriginsByCalendarId = {
  [gregoryCalendarId]: {
    bce: -1,
    ce: 0
  },
  japanese: {
    bce: -1,
    ce: 0,
    meiji: 1867,
    taisho: 1911,
    showa: 1925,
    heisei: 1988,
    reiwa: 2018
  },
  ethioaa: {
    era0: 0
  },
  ethiopic: {
    era0: 0,
    era1: 5500
  },
  coptic: {
    era0: -1,
    era1: 0
  },
  roc: {
    beforeroc: -1,
    minguo: 0
  },
  buddhist: {
    be: 0
  },
  islamic: {
    ah: 0
  },
  indian: {
    saka: 0
  },
  persian: {
    ap: 0
  }
}, leapMonthMetas = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, requireString = bindArgs(requireType, "string"), requireBoolean = bindArgs(requireType, "boolean"), requireNumber = bindArgs(requireType, "number"), requireFunction = bindArgs(requireType, "function"), durationFieldNamesAsc = unitNamesAsc.map((unitName => unitName + "s")), durationFieldNamesAlpha = sortStrings(durationFieldNamesAsc), durationTimeFieldNamesAsc = durationFieldNamesAsc.slice(0, 6), durationDateFieldNamesAsc = durationFieldNamesAsc.slice(6), durationCalendarFieldNamesAsc = durationDateFieldNamesAsc.slice(1), durationFieldIndexes = mapPropNamesToIndex(durationFieldNamesAsc), durationFieldDefaults = mapPropNamesToConstant(durationFieldNamesAsc, 0), durationTimeFieldDefaults = mapPropNamesToConstant(durationTimeFieldNamesAsc, 0), clearDurationFields = bindArgs(zeroOutProps, durationFieldNamesAsc), isoTimeFieldNamesAsc = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], isoDateFieldNamesAsc = [ "isoDay", "isoMonth", "isoYear" ], isoDateTimeFieldNamesAsc = [ ...isoTimeFieldNamesAsc, ...isoDateFieldNamesAsc ], isoDateFieldNamesAlpha = sortStrings(isoDateFieldNamesAsc), isoTimeFieldNamesAlpha = sortStrings(isoTimeFieldNamesAsc), isoDateTimeFieldNamesAlpha = sortStrings(isoDateTimeFieldNamesAsc), isoTimeFieldDefaults = mapPropNamesToConstant(isoTimeFieldNamesAlpha, 0), clearIsoFields = bindArgs(zeroOutProps, isoDateTimeFieldNamesAsc), RawDateTimeFormat = Intl.DateTimeFormat, maxMilli = 1e8 * milliInDay, epochNanoMax = [ 1e8, 0 ], epochNanoMin = [ -1e8, 0 ], isoYearMax = 275760, isoYearMin = -271821, isoEpochOriginYear = 1970, isoEpochFirstLeapYear = 1972, isoMonthsInYear = 12, primaryJapaneseEraMilli = isoArgsToEpochMilli(1868, 9, 8), queryJapaneseEraParts = memoize((isoFields => {
  const epochMilli = isoToEpochMilli(isoFields);
  if (epochMilli < primaryJapaneseEraMilli) {
    return computeGregoryEraParts(isoFields);
  }
  const intlParts = hashIntlFormatParts(queryCalendarIntlFormat("japanese"), epochMilli), {era: era, eraYear: eraYear} = parseIntlYear(intlParts, "japanese");
  return [ era, eraYear ];
}), WeakMap), smallestUnitStr = "smallestUnit", roundingIncName = "roundingIncrement", subsecDigitsName = "fractionalSecondDigits", overflowMap = {
  constrain: 0,
  reject: 1
}, overflowMapNames = Object.keys(overflowMap), refineSmallestUnit = bindArgs(refineUnitOption, smallestUnitStr), refineLargestUnit = bindArgs(refineUnitOption, "largestUnit"), refineTotalUnit = bindArgs(refineUnitOption, "unit"), refineOverflow = bindArgs(refineChoiceOption, "overflow", overflowMap), refineEpochDisambig = bindArgs(refineChoiceOption, "disambiguation", {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}), refineOffsetDisambig = bindArgs(refineChoiceOption, "offset", {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}), refineCalendarDisplay = bindArgs(refineChoiceOption, "calendarName", {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}), refineTimeZoneDisplay = bindArgs(refineChoiceOption, "timeZoneName", {
  auto: 0,
  never: 1,
  critical: 2
}), refineOffsetDisplay = bindArgs(refineChoiceOption, "offset", {
  auto: 0,
  never: 1
}), refineRoundingMode = bindArgs(refineChoiceOption, "roundingMode", {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}), PlainYearMonthBranding = "PlainYearMonth", PlainMonthDayBranding = "PlainMonthDay", PlainDateBranding = "PlainDate", PlainDateTimeBranding = "PlainDateTime", PlainTimeBranding = "PlainTime", ZonedDateTimeBranding = "ZonedDateTime", InstantBranding = "Instant", DurationBranding = "Duration", roundingModeFuncs = [ Math.floor, num => hasHalf(num) ? Math.floor(num) : Math.round(num), Math.ceil, num => hasHalf(num) ? Math.ceil(num) : Math.round(num), Math.trunc, num => hasHalf(num) ? Math.trunc(num) || 0 : Math.round(num), num => num < 0 ? Math.floor(num) : Math.ceil(num), num => Math.sign(num) * Math.round(Math.abs(num)) || 0, num => hasHalf(num) ? (num = Math.trunc(num) || 0) + num % 2 : Math.round(num) ], utcTimeZoneId = "UTC", periodDur = 5184e3, minPossibleTransition = isoArgsToEpochSec(1847), maxPossibleTransition = isoArgsToEpochSec((new Date).getUTCFullYear() + 10), trailingZerosRE = /0+$/, zonedEpochSlotsToIso = memoize(((slots, getTimeZoneOps) => {
  const {epochNanoseconds: epochNanoseconds} = slots, offsetNanoseconds = (getTimeZoneOps.getOffsetNanosecondsFor ? getTimeZoneOps : getTimeZoneOps(slots.timeZone)).getOffsetNanosecondsFor(epochNanoseconds), isoDateTimeFields = epochNanoToIso(epochNanoseconds, offsetNanoseconds);
  return {
    calendar: slots.calendar,
    ...isoDateTimeFields,
    offsetNanoseconds: offsetNanoseconds
  };
}), WeakMap), maxCalendarUnit = 2 ** 32 - 1, queryNativeTimeZone = memoize((slotId => {
  const essence = getTimeZoneEssence(slotId);
  return "object" == typeof essence ? new IntlTimeZone(essence) : new FixedTimeZone(essence || 0);
}));

class FixedTimeZone {
  constructor(offsetNano) {
    this.offsetNano = offsetNano;
  }
  getOffsetNanosecondsFor() {
    return this.offsetNano;
  }
  getPossibleInstantsFor(isoDateTimeFields) {
    return [ isoToEpochNanoWithOffset(isoDateTimeFields, this.offsetNano) ];
  }
  getTransition() {}
}

class IntlTimeZone {
  constructor(format) {
    this.tzStore = (computeOffsetSec => {
      function getOffsetSec(epochSec) {
        const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition), [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec), startOffsetSec = getSample(startEpochSec), endOffsetSec = getSample(endEpochSec);
        return startOffsetSec === endOffsetSec ? startOffsetSec : pinch(getSplit(startEpochSec, endEpochSec), startOffsetSec, endOffsetSec, epochSec);
      }
      function pinch(split, startOffsetSec, endOffsetSec, forEpochSec) {
        let offsetSec, splitDurSec;
        for (;(void 0 === forEpochSec || void 0 === (offsetSec = forEpochSec < split[0] ? startOffsetSec : forEpochSec >= split[1] ? endOffsetSec : void 0)) && (splitDurSec = split[1] - split[0]); ) {
          const middleEpochSec = split[0] + Math.floor(splitDurSec / 2);
          computeOffsetSec(middleEpochSec) === endOffsetSec ? split[1] = middleEpochSec : split[0] = middleEpochSec + 1;
        }
        return offsetSec;
      }
      const getSample = memoize(computeOffsetSec), getSplit = memoize(createSplitTuple);
      let minTransition = minPossibleTransition, maxTransition = maxPossibleTransition;
      return {
        getPossibleEpochSec(zonedEpochSec) {
          const wideOffsetSec0 = getOffsetSec(zonedEpochSec - 86400), wideOffsetSec1 = getOffsetSec(zonedEpochSec + 86400), wideUtcEpochSec0 = zonedEpochSec - wideOffsetSec0, wideUtcEpochSec1 = zonedEpochSec - wideOffsetSec1;
          if (wideOffsetSec0 === wideOffsetSec1) {
            return [ wideUtcEpochSec0 ];
          }
          const narrowOffsetSec0 = getOffsetSec(wideUtcEpochSec0);
          return narrowOffsetSec0 === getOffsetSec(wideUtcEpochSec1) ? [ zonedEpochSec - narrowOffsetSec0 ] : wideOffsetSec0 > wideOffsetSec1 ? [ wideUtcEpochSec0, wideUtcEpochSec1 ] : [];
        },
        getOffsetSec: getOffsetSec,
        getTransition(epochSec, direction) {
          const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition);
          let [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec);
          const inc = periodDur * direction, inBounds = direction < 0 ? () => endEpochSec > minTransition || (minTransition = clampedEpochSec, 
          0) : () => startEpochSec < maxTransition || (maxTransition = clampedEpochSec, 0);
          for (;inBounds(); ) {
            const startOffsetSec = getSample(startEpochSec), endOffsetSec = getSample(endEpochSec);
            if (startOffsetSec !== endOffsetSec) {
              const split = getSplit(startEpochSec, endEpochSec);
              pinch(split, startOffsetSec, endOffsetSec);
              const transitionEpochSec = split[0];
              if ((compareNumbers(transitionEpochSec, epochSec) || 1) === direction) {
                return transitionEpochSec;
              }
            }
            startEpochSec += inc, endEpochSec += inc;
          }
        }
      };
    })((format => epochSec => {
      const intlParts = hashIntlFormatParts(format, epochSec * milliInSec);
      return isoArgsToEpochSec(parseIntlPartsYear(intlParts), parseInt(intlParts.month), parseInt(intlParts.day), parseInt(intlParts.hour), parseInt(intlParts.minute), parseInt(intlParts.second)) - epochSec;
    })(format));
  }
  getOffsetNanosecondsFor(epochNano) {
    return this.tzStore.getOffsetSec(epochNanoToSec(epochNano)) * nanoInSec;
  }
  getPossibleInstantsFor(isoFields) {
    const [zonedEpochSec, subsecNano] = [ isoArgsToEpochSec((isoDateTimeFields = isoFields).isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond), isoDateTimeFields.isoMillisecond * nanoInMilli + isoDateTimeFields.isoMicrosecond * nanoInMicro + isoDateTimeFields.isoNanosecond ];
    var isoDateTimeFields;
    return this.tzStore.getPossibleEpochSec(zonedEpochSec).map((epochSec => checkEpochNanoInBounds(moveBigNano(numberToBigNano(epochSec, nanoInSec), subsecNano))));
  }
  getTransition(epochNano, direction) {
    const [epochSec, subsecNano] = epochNanoToSecMod(epochNano), resEpochSec = this.tzStore.getTransition(epochSec + (direction > 0 || subsecNano ? 1 : 0), direction);
    if (void 0 !== resEpochSec) {
      return numberToBigNano(resEpochSec, nanoInSec);
    }
  }
}

const timeRegExpStr = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?", offsetRegExpStr = "([+−-])" + timeRegExpStr, dateTimeRegExpStr = "(?:(?:([+−-])(\\d{6}))|(\\d{4}))-?(\\d{2})-?(\\d{2})(?:[T ]" + timeRegExpStr + "(Z|" + offsetRegExpStr + ")?)?", yearMonthRegExp = createRegExp("(?:(?:([+−-])(\\d{6}))|(\\d{4}))-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})"), monthDayRegExp = createRegExp("(?:--)?(\\d{2})-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})"), dateTimeRegExp = createRegExp(dateTimeRegExpStr + "((?:\\[(!?)([^\\]]*)\\]){0,9})"), timeRegExp = createRegExp("T?" + timeRegExpStr + "(?:" + offsetRegExpStr + ")?((?:\\[(!?)([^\\]]*)\\]){0,9})"), offsetRegExp = createRegExp(offsetRegExpStr), annotationRegExp = new RegExp("\\[(!?)([^\\]]*)\\]", "g"), durationRegExp = createRegExp("([+−-])?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)(?:[.,](\\d{1,9}))?H)?(?:(\\d+)(?:[.,](\\d{1,9}))?M)?(?:(\\d+)(?:[.,](\\d{1,9}))?S)?)?"), queryTimeZoneIntlFormat = memoize((id => new RawDateTimeFormat("en-GB", {
  timeZone: id,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), icuRegExp = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, queryIntlCalendar = memoize((calendarId => {
  function epochMilliToIntlFields(epochMilli) {
    return ((intlParts, calendarIdBase) => ({
      ...parseIntlYear(intlParts, calendarIdBase),
      monthString: intlParts.month,
      day: parseInt(intlParts.day)
    }))(hashIntlFormatParts(intlFormat, epochMilli), calendarIdBase);
  }
  const intlFormat = queryCalendarIntlFormat(calendarId), calendarIdBase = computeCalendarIdBase(calendarId);
  return {
    id: calendarId,
    queryFields: createIntlFieldCache(epochMilliToIntlFields),
    queryYearData: createIntlYearDataCache(epochMilliToIntlFields)
  };
})), queryCalendarIntlFormat = memoize((id => new RawDateTimeFormat("en-GB", {
  calendar: id,
  timeZone: utcTimeZoneId,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), monthCodeRegExp = /^M(\d{2})(L?)$/, builtinRefiners = {
  era: toStringViaPrimitive,
  eraYear: toInteger,
  year: toInteger,
  month: toPositiveInteger,
  monthCode: toStringViaPrimitive,
  day: toPositiveInteger,
  ...mapPropNamesToConstant(timeFieldNamesAsc, toInteger),
  ...mapPropNamesToConstant(durationFieldNamesAsc, toStrictInteger),
  offset: toStringViaPrimitive
}, timeFieldsToIso = bindArgs(((oldNames, newNames, oldProps) => {
  const newProps = {};
  for (let i = 0; i < oldNames.length; i++) {
    newProps[newNames[i]] = oldProps[oldNames[i]];
  }
  return newProps;
}), timeFieldNamesAsc, isoTimeFieldNamesAsc), nativeStandardBase = {
  dateAdd(isoDateFields, durationFields, options) {
    const overflow = refineOverflowOptions(options);
    let epochMilli, {years: years, months: months, weeks: weeks, days: days} = durationFields;
    if (days += durationFieldsToBigNano(durationFields, 5)[0], years || months) {
      epochMilli = ((moveOps, isoDateFields, years, months, overflow) => {
        let [year, month, day] = moveOps.dateParts(isoDateFields);
        if (years) {
          const [monthCodeNumber, isLeapMonth] = moveOps.monthCodeParts(year, month);
          year += years, month = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, moveOps.leapMonth(year)), 
          month = clampEntity("month", month, 1, moveOps.monthsInYearPart(year), overflow);
        }
        return months && ([year, month] = moveOps.monthAdd(year, month, months)), day = clampEntity("day", day, 1, moveOps.daysInMonthParts(year, month), overflow), 
        moveOps.epochMilli(year, month, day);
      })(this, isoDateFields, years, months, overflow);
    } else {
      if (!weeks && !days) {
        return isoDateFields;
      }
      epochMilli = isoToEpochMilli(isoDateFields);
    }
    return epochMilli += (7 * weeks + days) * milliInDay, checkIsoDateInBounds(epochMilliToIso(epochMilli));
  },
  dateUntil(startIsoFields, endIsoFields, largestUnit) {
    if (largestUnit <= 7) {
      let weeks = 0, days = diffDays({
        ...startIsoFields,
        ...isoTimeFieldDefaults
      }, {
        ...endIsoFields,
        ...isoTimeFieldDefaults
      });
      return 7 === largestUnit && ([weeks, days] = divModTrunc(days, 7)), {
        ...durationFieldDefaults,
        weeks: weeks,
        days: days
      };
    }
    const yearMonthDayStart = this.dateParts(startIsoFields), yearMonthDayEnd = this.dateParts(endIsoFields);
    let [years, months, days] = ((calendarNative, year0, month0, day0, year1, month1, day1) => {
      let yearDiff = year1 - year0, monthDiff = month1 - month0, dayDiff = day1 - day0;
      if (yearDiff || monthDiff) {
        const sign = Math.sign(yearDiff || monthDiff);
        let daysInMonth1 = calendarNative.daysInMonthParts(year1, month1), dayCorrect = 0;
        if (Math.sign(dayDiff) === -sign) {
          const origDaysInMonth1 = daysInMonth1;
          [year1, month1] = calendarNative.monthAdd(year1, month1, -sign), yearDiff = year1 - year0, 
          monthDiff = month1 - month0, daysInMonth1 = calendarNative.daysInMonthParts(year1, month1), 
          dayCorrect = sign < 0 ? -origDaysInMonth1 : daysInMonth1;
        }
        if (dayDiff = day1 - Math.min(day0, daysInMonth1) + dayCorrect, yearDiff) {
          const [monthCodeNumber0, isLeapYear0] = calendarNative.monthCodeParts(year0, month0), [monthCodeNumber1, isLeapYear1] = calendarNative.monthCodeParts(year1, month1);
          if (monthDiff = monthCodeNumber1 - monthCodeNumber0 || Number(isLeapYear1) - Number(isLeapYear0), 
          Math.sign(monthDiff) === -sign) {
            const monthCorrect = sign < 0 && -calendarNative.monthsInYearPart(year1);
            yearDiff = (year1 -= sign) - year0, monthDiff = month1 - monthCodeNumberToMonth(monthCodeNumber0, isLeapYear0, calendarNative.leapMonth(year1)) + (monthCorrect || calendarNative.monthsInYearPart(year1));
          }
        }
      }
      return [ yearDiff, monthDiff, dayDiff ];
    })(this, ...yearMonthDayStart, ...yearMonthDayEnd);
    return 8 === largestUnit && (months += this.monthsInYearSpan(years, yearMonthDayStart[0]), 
    years = 0), {
      ...durationFieldDefaults,
      years: years,
      months: months,
      days: days
    };
  },
  dateFromFields(fields, options) {
    const overflow = refineOverflowOptions(options), year = refineYear(this, fields), month = refineMonth(this, fields, year, overflow), day = refineDay(this, fields, month, year, overflow);
    return createPlainDateSlots(checkIsoDateInBounds(this.isoFields(year, month, day)), this.id || isoCalendarId);
  },
  yearMonthFromFields(fields, options) {
    const overflow = refineOverflowOptions(options), year = refineYear(this, fields), month = refineMonth(this, fields, year, overflow);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.isoFields(year, month, 1)), this.id || isoCalendarId);
  },
  monthDayFromFields(fields, options) {
    const overflow = refineOverflowOptions(options), isIso = !this.id, {monthCode: monthCode, year: year, month: month} = fields;
    let monthCodeNumber, isLeapMonth, normalYear, normalMonth, normalDay;
    if (void 0 !== monthCode) {
      [monthCodeNumber, isLeapMonth] = parseMonthCode(monthCode), normalDay = getDefinedProp(fields, "day");
      const res = this.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, normalDay);
      if (!res) {
        throw new RangeError("Cannot guess year");
      }
      if ([normalYear, normalMonth] = res, void 0 !== month && month !== normalMonth) {
        throw new RangeError(mismatchingMonthAndCode);
      }
      isIso && (normalMonth = clampEntity("month", normalMonth, 1, isoMonthsInYear, 1), 
      normalDay = clampEntity("day", normalDay, 1, computeIsoDaysInMonth(void 0 !== year ? year : normalYear, normalMonth), overflow));
    } else {
      normalYear = void 0 === year && isIso ? isoEpochFirstLeapYear : refineYear(this, fields), 
      normalMonth = refineMonth(this, fields, normalYear, overflow), normalDay = refineDay(this, fields, normalMonth, normalYear, overflow);
      const leapMonth = this.leapMonth(normalYear);
      isLeapMonth = normalMonth === leapMonth, monthCodeNumber = monthToMonthCodeNumber(normalMonth, leapMonth);
      const res = this.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, normalDay);
      if (!res) {
        throw new RangeError("Cannot guess year");
      }
      [normalYear, normalMonth] = res;
    }
    return createPlainMonthDaySlots(checkIsoDateInBounds(this.isoFields(normalYear, normalMonth, normalDay)), this.id || isoCalendarId);
  },
  fields(fieldNames) {
    return getCalendarEraOrigins(this) && fieldNames.includes("year") ? [ ...fieldNames, ...eraYearFieldNames ] : fieldNames;
  },
  mergeFields(baseFields, additionalFields) {
    const merged = Object.assign(Object.create(null), baseFields);
    return spliceFields(merged, additionalFields, monthFieldNames), getCalendarEraOrigins(this) && (spliceFields(merged, additionalFields, allYearFieldNames), 
    "japanese" === this.id && spliceFields(merged, additionalFields, monthDayFieldNames, eraYearFieldNames)), 
    merged;
  },
  inLeapYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.inLeapYearPart(year);
  },
  monthsInYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.monthsInYearPart(year);
  },
  daysInMonth(isoFields) {
    const [year, month] = this.dateParts(isoFields);
    return this.daysInMonthParts(year, month);
  },
  daysInYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.daysInYearPart(year);
  },
  dayOfYear: computeNativeDayOfYear,
  era(isoFields) {
    return this.eraParts(isoFields)[0];
  },
  eraYear(isoFields) {
    return this.eraParts(isoFields)[1];
  },
  monthCode(isoFields) {
    const [year, month] = this.dateParts(isoFields), [monthCodeNumber, isLeapMonth] = this.monthCodeParts(year, month);
    return ((monthCodeNumber, isLeapMonth) => "M" + padNumber2(monthCodeNumber) + (isLeapMonth ? "L" : ""))(monthCodeNumber, isLeapMonth);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, isoWeekOps = {
  dayOfYear: computeNativeDayOfYear,
  dateParts: computeIsoDateParts,
  epochMilli: isoArgsToEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  weekParts(isoDateFields) {
    function computeWeekShift(yDayOfWeek) {
      return (7 - yDayOfWeek < minDaysInWeek ? 7 : 0) - yDayOfWeek;
    }
    function computeWeeksInYear(delta) {
      const daysInYear = computeIsoDaysInYear(yearOfWeek + delta), sign = delta || 1, y1WeekShift = computeWeekShift(modFloor(y0DayOfWeek + daysInYear * sign, 7));
      return weeksInYear = (daysInYear + (y1WeekShift - y0WeekShift) * sign) / 7;
    }
    const minDaysInWeek = this.id ? 1 : 4, isoDayOfWeek = computeIsoDayOfWeek(isoDateFields), isoDayOfYear = this.dayOfYear(isoDateFields), dayOfWeek = modFloor(isoDayOfWeek - 1, 7), dayOfYear = isoDayOfYear - 1, y0DayOfWeek = modFloor(dayOfWeek - dayOfYear, 7), y0WeekShift = computeWeekShift(y0DayOfWeek);
    let weeksInYear, weekOfYear = Math.floor((dayOfYear - y0WeekShift) / 7) + 1, yearOfWeek = isoDateFields.isoYear;
    return weekOfYear ? weekOfYear > computeWeeksInYear(0) && (weekOfYear = 1, yearOfWeek++) : (weekOfYear = computeWeeksInYear(-1), 
    yearOfWeek--), [ weekOfYear, yearOfWeek, weeksInYear ];
  }
}, isoStandardOps = {
  ...nativeStandardBase,
  ...isoWeekOps,
  dateParts: computeIsoDateParts,
  eraParts(isoFields) {
    return this.id === gregoryCalendarId ? computeGregoryEraParts(isoFields) : "japanese" === this.id ? queryJapaneseEraParts(isoFields) : [];
  },
  monthCodeParts(_isoYear, isoMonth) {
    return [ isoMonth, 0 ];
  },
  yearMonthForMonthDay(monthCodeNumber, isLeapMonth) {
    if (!isLeapMonth) {
      return [ isoEpochFirstLeapYear, monthCodeNumber ];
    }
  },
  inLeapYearPart: computeIsoInLeapYear,
  leapMonth() {},
  monthsInYearPart: computeIsoMonthsInYear,
  monthsInYearSpan: yearDelta => yearDelta * isoMonthsInYear,
  daysInMonthParts: computeIsoDaysInMonth,
  daysInYearPart: computeIsoDaysInYear,
  isoFields(year, month, day) {
    return {
      isoYear: year,
      isoMonth: month,
      isoDay: day
    };
  },
  epochMilli: isoArgsToEpochMilli,
  monthAdd(year, month, monthDelta) {
    return year += divTrunc(monthDelta, isoMonthsInYear), (month += modTrunc(monthDelta, isoMonthsInYear)) < 1 ? (year--, 
    month += isoMonthsInYear) : month > isoMonthsInYear && (year++, month -= isoMonthsInYear), 
    [ year, month ];
  },
  year(isoFields) {
    return isoFields.isoYear;
  },
  month(isoFields) {
    return isoFields.isoMonth;
  },
  day: isoFields => isoFields.isoDay
}, intlWeekOps = {
  dayOfYear: computeNativeDayOfYear,
  dateParts: computeIntlDateParts,
  epochMilli: computeIntlEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  weekParts() {
    return [];
  }
}, intlStandardOps = {
  ...nativeStandardBase,
  ...intlWeekOps,
  dateParts: computeIntlDateParts,
  eraParts(isoFields) {
    const intlFields = this.queryFields(isoFields);
    return [ intlFields.era, intlFields.eraYear ];
  },
  monthCodeParts(year, month) {
    const leapMonth = computeIntlLeapMonth.call(this, year);
    return [ monthToMonthCodeNumber(month, leapMonth), leapMonth === month ];
  },
  yearMonthForMonthDay(monthCodeNumber, isLeapMonth, day) {
    let [startYear, startMonth, startDay] = computeIntlDateParts.call(this, {
      isoYear: isoEpochFirstLeapYear,
      isoMonth: isoMonthsInYear,
      isoDay: 31
    });
    const startYearLeapMonth = computeIntlLeapMonth.call(this, startYear), startMonthIsLeap = startMonth === startYearLeapMonth;
    1 === (compareNumbers(monthCodeNumber, monthToMonthCodeNumber(startMonth, startYearLeapMonth)) || compareNumbers(Number(isLeapMonth), Number(startMonthIsLeap)) || compareNumbers(day, startDay)) && startYear--;
    for (let yearMove = 0; yearMove < 100; yearMove++) {
      const tryYear = startYear - yearMove, tryLeapMonth = computeIntlLeapMonth.call(this, tryYear), tryMonth = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, tryLeapMonth);
      if (isLeapMonth === (tryMonth === tryLeapMonth) && day <= computeIntlDaysInMonth.call(this, tryYear, tryMonth)) {
        return [ tryYear, tryMonth ];
      }
    }
  },
  inLeapYearPart(year) {
    const days = computeIntlDaysInYear.call(this, year);
    return days > computeIntlDaysInYear.call(this, year - 1) && days > computeIntlDaysInYear.call(this, year + 1);
  },
  leapMonth: computeIntlLeapMonth,
  monthsInYearPart: computeIntlMonthsInYear,
  monthsInYearSpan(yearDelta, yearStart) {
    const yearEnd = yearStart + yearDelta, yearSign = Math.sign(yearDelta), yearCorrection = yearSign < 0 ? -1 : 0;
    let months = 0;
    for (let year = yearStart; year !== yearEnd; year += yearSign) {
      months += computeIntlMonthsInYear.call(this, year + yearCorrection);
    }
    return months;
  },
  daysInMonthParts: computeIntlDaysInMonth,
  daysInYearPart: computeIntlDaysInYear,
  isoFields(year, month, day) {
    return epochMilliToIso(computeIntlEpochMilli.call(this, year, month, day));
  },
  epochMilli: computeIntlEpochMilli,
  monthAdd(year, month, monthDelta) {
    if (monthDelta) {
      if (month += monthDelta, !Number.isSafeInteger(month)) {
        throw new RangeError(outOfBoundsDate);
      }
      if (monthDelta < 0) {
        for (;month < 1; ) {
          month += computeIntlMonthsInYear.call(this, --year);
        }
      } else {
        let monthsInYear;
        for (;month > (monthsInYear = computeIntlMonthsInYear.call(this, year)); ) {
          month -= monthsInYear, year++;
        }
      }
    }
    return [ year, month ];
  },
  year(isoFields) {
    return this.queryFields(isoFields).year;
  },
  month(isoFields) {
    const {year: year, monthString: monthString} = this.queryFields(isoFields), {monthStringToIndex: monthStringToIndex} = this.queryYearData(year);
    return monthStringToIndex[monthString] + 1;
  },
  day(isoFields) {
    return this.queryFields(isoFields).day;
  }
}, createNativeStandardOps = (isoOps = isoStandardOps, intlOps = intlStandardOps, 
calendarId => calendarId === isoCalendarId ? isoOps : calendarId === gregoryCalendarId || "japanese" === calendarId ? Object.assign(Object.create(isoOps), {
  id: calendarId
}) : Object.assign(Object.create(intlOps), queryIntlCalendar(calendarId)));

var isoOps, intlOps;

const timeZoneNameStrs = [ "timeZoneName" ], monthDayFallbacks = {
  month: "numeric",
  day: "numeric"
}, yearMonthFallbacks = {
  year: "numeric",
  month: "numeric"
}, dateFallbacks = {
  ...yearMonthFallbacks,
  day: "numeric"
}, timeFallbacks = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}, dateTimeFallbacks = {
  ...dateFallbacks,
  ...timeFallbacks
}, zonedFallbacks = {
  ...dateTimeFallbacks,
  timeZoneName: "short"
}, yearMonthFallbackNames = Object.keys(yearMonthFallbacks), monthDayFallbackNames = Object.keys(monthDayFallbacks), dateFallbackNames = Object.keys(dateFallbacks), timeFallbackNames = Object.keys(timeFallbacks), dateStyleNames = [ "dateStyle" ], yearMonthStandardNames = [ ...yearMonthFallbackNames, ...dateStyleNames ], monthDayStandardNames = [ ...monthDayFallbackNames, ...dateStyleNames ], dateStandardNames = [ ...dateFallbackNames, ...dateStyleNames, "weekday" ], timeStandardNames = [ ...timeFallbackNames, "dayPeriod", "timeStyle" ], dateTimeStandardNames = [ ...dateStandardNames, ...timeStandardNames ], zonedStandardNames = [ ...dateTimeStandardNames, ...timeZoneNameStrs ], dateExclusions = [ ...timeZoneNameStrs, ...timeStandardNames ], timeExclusions = [ ...timeZoneNameStrs, ...dateStandardNames ], yearMonthExclusions = [ ...timeZoneNameStrs, "day", "weekday", ...timeStandardNames ], monthDayExclusions = [ ...timeZoneNameStrs, "year", "weekday", ...timeStandardNames ], transformInstantOptions = createOptionsTransformer(dateTimeStandardNames, dateTimeFallbacks), transformZonedOptions = createOptionsTransformer(zonedStandardNames, zonedFallbacks), transformDateTimeOptions = createOptionsTransformer(dateTimeStandardNames, dateTimeFallbacks, timeZoneNameStrs), transformDateOptions = createOptionsTransformer(dateStandardNames, dateFallbacks, dateExclusions), transformTimeOptions = createOptionsTransformer(timeStandardNames, timeFallbacks, timeExclusions), transformYearMonthOptions = createOptionsTransformer(yearMonthStandardNames, yearMonthFallbacks, yearMonthExclusions), transformMonthDayOptions = createOptionsTransformer(monthDayStandardNames, monthDayFallbacks, monthDayExclusions), emptyOptions = {}, instantConfig = [ transformInstantOptions, getEpochMilli ], zonedConfig = [ transformZonedOptions, getEpochMilli, 0, (slots0, slots1) => {
  const timeZoneId = getId(slots0.timeZone);
  if (slots1 && getId(slots1.timeZone) !== timeZoneId) {
    throw new RangeError("Mismatching TimeZones");
  }
  return timeZoneId;
} ], dateTimeConfig = [ transformDateTimeOptions, isoToEpochMilli ], dateConfig = [ transformDateOptions, isoToEpochMilli ], timeConfig = [ transformTimeOptions, isoFields => isoTimeFieldsToNano(isoFields) / nanoInMilli ], yearMonthConfig = [ transformYearMonthOptions, isoToEpochMilli, 1 ], monthDayConfig = [ transformMonthDayOptions, isoToEpochMilli, 1 ];

let currentTimeZoneId;

exports.DurationBranding = DurationBranding, exports.InstantBranding = InstantBranding, 
exports.PlainDateBranding = PlainDateBranding, exports.PlainDateTimeBranding = PlainDateTimeBranding, 
exports.PlainMonthDayBranding = PlainMonthDayBranding, exports.PlainTimeBranding = PlainTimeBranding, 
exports.PlainYearMonthBranding = PlainYearMonthBranding, exports.RawDateTimeFormat = RawDateTimeFormat, 
exports.ZonedDateTimeBranding = ZonedDateTimeBranding, exports.absDuration = slots => -1 === slots.sign ? negateDuration(slots) : slots, 
exports.addDurations = (refineRelativeTo, getCalendarOps, getTimeZoneOps, doSubtract, slots, otherSlots, options) => {
  const relativeToSlots = refineRelativeTo(normalizeOptions(options).relativeTo), maxUnit = Math.max(getMaxDurationUnit(slots), getMaxDurationUnit(otherSlots));
  if (isUniformUnit(maxUnit, relativeToSlots)) {
    return createDurationSlots(checkDurationUnits(((a, b, largestUnit, doSubtract) => {
      const combined = addBigNanos(durationFieldsToBigNano(a), durationFieldsToBigNano(b), doSubtract ? -1 : 1);
      if (!Number.isFinite(combined[0])) {
        throw new RangeError(outOfBoundsDate);
      }
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(combined, largestUnit)
      };
    })(slots, otherSlots, maxUnit, doSubtract)));
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  doSubtract && (otherSlots = negateDurationFields(otherSlots));
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), midMarker = moveMarker(calendarOps, marker, slots);
  return createDurationSlots(diffMarkers(calendarOps, marker, moveMarker(calendarOps, midMarker, otherSlots), maxUnit));
}, exports.bigNanoToNumber = bigNanoToNumber, exports.bindArgs = bindArgs, exports.buildZonedIsoFields = (getTimeZoneOps, zonedDateTimeSlots) => {
  const isoFields = zonedEpochSlotsToIso(zonedDateTimeSlots, getTimeZoneOps);
  return {
    calendar: zonedDateTimeSlots.calendar,
    ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields),
    offset: formatOffsetNano(isoFields.offsetNanoseconds),
    timeZone: zonedDateTimeSlots.timeZone
  };
}, exports.compareBigNanos = compareBigNanos, exports.compareDurations = (refineRelativeTo, getCalendarOps, getTimeZoneOps, durationSlots0, durationSlots1, options) => {
  const relativeToSlots = refineRelativeTo(normalizeOptions(options).relativeTo), maxUnit = Math.max(getMaxDurationUnit(durationSlots0), getMaxDurationUnit(durationSlots1));
  if (allPropsEqual(durationFieldNamesAsc, durationSlots0, durationSlots1)) {
    return 0;
  }
  if (isUniformUnit(maxUnit, relativeToSlots)) {
    return compareBigNanos(durationFieldsToBigNano(durationSlots0), durationFieldsToBigNano(durationSlots1));
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps);
  return compareBigNanos(markerToEpochNano(moveMarker(calendarOps, marker, durationSlots0)), markerToEpochNano(moveMarker(calendarOps, marker, durationSlots1)));
}, exports.compareInstants = compareInstants, exports.compareIsoDateFields = compareIsoDateFields, 
exports.compareIsoDateTimeFields = compareIsoDateTimeFields, exports.compareIsoTimeFields = compareIsoTimeFields, 
exports.compareZonedDateTimes = compareZonedDateTimes, exports.computeZonedHoursInDay = (getTimeZoneOps, slots) => {
  const timeZoneOps = getTimeZoneOps(slots.timeZone), isoFields = zonedEpochSlotsToIso(slots, timeZoneOps), [isoFields0, isoFields1] = computeDayInterval(isoFields), hoursExact = bigNanoToNumber(diffBigNanos(getSingleInstantFor(timeZoneOps, isoFields0), getSingleInstantFor(timeZoneOps, isoFields1)), nanoInHour, 1);
  if (hoursExact <= 0) {
    throw new RangeError(invalidProtocolResults);
  }
  return hoursExact;
}, exports.computeZonedStartOfDay = (getTimeZoneOps, slots) => {
  const {timeZone: timeZone, calendar: calendar} = slots;
  return createZonedDateTimeSlots(((computeAlignment, timeZoneOps, slots) => getSingleInstantFor(timeZoneOps, computeAlignment(zonedEpochSlotsToIso(slots, timeZoneOps))))(computeDayFloor, getTimeZoneOps(timeZone), slots), timeZone, calendar);
}, exports.constructDurationSlots = (years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0) => createDurationSlots(checkDurationUnits(mapProps(toStrictInteger, zipProps(durationFieldNamesAsc, [ years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds ])))), 
exports.constructInstantSlots = epochNano => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano)))), 
exports.constructPlainDateSlots = (refineCalendarArg, isoYear, isoMonth, isoDay, calendarArg = isoCalendarId) => createPlainDateSlots(checkIsoDateInBounds(checkIsoDateFields(mapProps(toInteger, {
  isoYear: isoYear,
  isoMonth: isoMonth,
  isoDay: isoDay
}))), refineCalendarArg(calendarArg)), exports.constructPlainDateTimeSlots = (refineCalendarArg, isoYear, isoMonth, isoDay, isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0, calendarArg = isoCalendarId) => createPlainDateTimeSlots(checkIsoDateTimeInBounds(checkIsoDateTimeFields(mapProps(toInteger, zipProps(isoDateTimeFieldNamesAsc, [ isoYear, isoMonth, isoDay, isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond ])))), refineCalendarArg(calendarArg)), 
exports.constructPlainMonthDaySlots = (refineCalendarArg, isoMonth, isoDay, calendar = isoCalendarId, referenceIsoYear = isoEpochFirstLeapYear) => {
  const isoMonthInt = toInteger(isoMonth), isoDayInt = toInteger(isoDay), calendarSlot = refineCalendarArg(calendar);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(referenceIsoYear),
    isoMonth: isoMonthInt,
    isoDay: isoDayInt
  })), calendarSlot);
}, exports.constructPlainTimeSlots = (isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) => createPlainTimeSlots(constrainIsoTimeFields(mapProps(toInteger, zipProps(isoTimeFieldNamesAsc, [ isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond ])), 1)), 
exports.constructPlainYearMonthSlots = (refineCalendarArg, isoYear, isoMonth, calendar = isoCalendarId, referenceIsoDay = 1) => {
  const isoYearInt = toInteger(isoYear), isoMonthInt = toInteger(isoMonth), calendarSlot = refineCalendarArg(calendar);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: isoYearInt,
    isoMonth: isoMonthInt,
    isoDay: toInteger(referenceIsoDay)
  })), calendarSlot);
}, exports.constructZonedDateTimeSlots = (refineCalendarArg, refineTimeZoneArg, epochNano, timeZoneArg, calendarArg = isoCalendarId) => createZonedDateTimeSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano))), refineTimeZoneArg(timeZoneArg), refineCalendarArg(calendarArg)), 
exports.copyOptions = copyOptions, exports.createDurationSlots = createDurationSlots, 
exports.createFormatForPrep = createFormatForPrep, exports.createFormatPrepper = (config, queryFormat = createFormatForPrep) => {
  const [transformOptions, , , getForcedTimeZoneId] = config;
  return (locales, options = emptyOptions, ...slotsList) => {
    const subformat = queryFormat(getForcedTimeZoneId && getForcedTimeZoneId(...slotsList), locales, options, transformOptions), resolvedOptions = subformat.resolvedOptions();
    return [ subformat, ...toEpochMillis(config, resolvedOptions, slotsList) ];
  };
}, exports.createGetterDescriptors = getters => mapProps((getter => ({
  get: getter,
  configurable: 1
})), getters), exports.createInstantSlots = createInstantSlots, exports.createNameDescriptors = name => createPropDescriptors({
  name: name
}, 1), exports.createNativeStandardOps = createNativeStandardOps, exports.createPlainDateSlots = createPlainDateSlots, 
exports.createPlainDateTimeSlots = createPlainDateTimeSlots, exports.createPlainTimeSlots = createPlainTimeSlots, 
exports.createPropDescriptors = createPropDescriptors, exports.createStringTagDescriptors = value => ({
  [Symbol.toStringTag]: {
    value: value,
    configurable: 1
  }
}), exports.createZonedDateTimeSlots = createZonedDateTimeSlots, exports.dateConfig = dateConfig, 
exports.dateFieldNamesAlpha = dateFieldNamesAlpha, exports.dateTimeConfig = dateTimeConfig, 
exports.diffBigNanos = diffBigNanos, exports.diffInstants = (invert, instantSlots0, instantSlots1, options) => {
  const optionsTuple = refineDiffOptions(invert, copyOptions(options), 3, 5), durationFields = diffEpochNanos(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds, ...optionsTuple);
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainDateTimes = (getCalendarOps, invert, plainDateTimeSlots0, plainDateTimeSlots1, options) => {
  const calendarSlot = getCommonCalendarSlot(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar), optionsCopy = copyOptions(options), [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 6), startEpochNano = isoToEpochNano(plainDateTimeSlots0), endEpochNano = isoToEpochNano(plainDateTimeSlots1), sign = compareBigNanos(endEpochNano, startEpochNano);
  let durationFields;
  if (sign) {
    if (largestUnit <= 6) {
      durationFields = diffEpochNanos(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const calendarOps = getCalendarOps(calendarSlot);
      durationFields = diffDateTimesBig(calendarOps, plainDateTimeSlots0, plainDateTimeSlots1, sign, largestUnit, optionsCopy), 
      durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, plainDateTimeSlots0, isoToEpochNano, moveDateTime);
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainDates = (getCalendarOps, invert, plainDateSlots0, plainDateSlots1, options) => {
  const calendarSlot = getCommonCalendarSlot(plainDateSlots0.calendar, plainDateSlots1.calendar), optionsCopy = copyOptions(options);
  return diffDateLike(invert, (() => getCalendarOps(calendarSlot)), plainDateSlots0, plainDateSlots1, ...refineDiffOptions(invert, optionsCopy, 6, 9, 6), optionsCopy);
}, exports.diffPlainTimes = (invert, plainTimeSlots0, plainTimeSlots1, options) => {
  const optionsCopy = copyOptions(options), [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 5, 5), timeDiffNano = roundByInc(diffTimes(plainTimeSlots0, plainTimeSlots1), computeNanoInc(smallestUnit, roundingInc), roundingMode), durationFields = {
    ...durationFieldDefaults,
    ...nanoToDurationTimeFields(timeDiffNano, largestUnit)
  };
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.diffPlainYearMonth = (getCalendarOps, invert, plainYearMonthSlots0, plainYearMonthSlots1, options) => {
  const calendarSlot = getCommonCalendarSlot(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar), optionsCopy = copyOptions(options), optionsTuple = refineDiffOptions(invert, optionsCopy, 9, 9, 8), calendarOps = getCalendarOps(calendarSlot);
  return diffDateLike(invert, (() => calendarOps), moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots0), moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots1), ...optionsTuple, optionsCopy);
}, exports.diffZonedDateTimes = (getCalendarOps, getTimeZoneOps, invert, slots0, slots1, options) => {
  const calendarSlot = getCommonCalendarSlot(slots0.calendar, slots1.calendar), optionsCopy = copyOptions(options), [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 5), epochNano0 = slots0.epochNanoseconds, epochNano1 = slots1.epochNanoseconds, sign = compareBigNanos(epochNano1, epochNano0);
  let durationFields;
  if (sign) {
    if (largestUnit < 6) {
      durationFields = diffEpochNanos(epochNano0, epochNano1, largestUnit, smallestUnit, roundingInc, roundingMode);
    } else {
      const timeZoneOps = getTimeZoneOps(((a, b) => {
        if (!isTimeZoneSlotsEqual(a, b)) {
          throw new RangeError("Mismatching TimeZones");
        }
        return a;
      })(slots0.timeZone, slots1.timeZone)), calendarOps = getCalendarOps(calendarSlot);
      durationFields = diffZonedEpochsBig(calendarOps, timeZoneOps, slots0, slots1, sign, largestUnit, optionsCopy), 
      durationFields = roundRelativeDuration(durationFields, epochNano1, largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, slots0, extractEpochNano, bindArgs(moveZonedEpochs, timeZoneOps));
    }
  } else {
    durationFields = durationFieldDefaults;
  }
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}, exports.durationFieldNamesAsc = durationFieldNamesAsc, exports.durationWithFields = (slots, fields) => {
  return createDurationSlots((initialFields = slots, modFields = fields, checkDurationUnits({
    ...initialFields,
    ...refineFields(modFields, durationFieldNamesAlpha)
  })));
  // removed by dead control flow
 var initialFields, modFields; 
}, exports.epochMicroToInstant = epochMicro => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochMicro), nanoInMicro))), 
exports.epochMilliToInstant = epochMilli => createInstantSlots(checkEpochNanoInBounds(numberToBigNano(epochMilli, nanoInMilli))), 
exports.epochNanoToInstant = epochNano => createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(epochNano)))), 
exports.epochNanoToIso = epochNanoToIso, exports.epochSecToInstant = epochSec => createInstantSlots(checkEpochNanoInBounds(numberToBigNano(epochSec, nanoInSec))), 
exports.excludePropsByName = excludePropsByName, exports.excludeUndefinedProps = props => {
  props = {
    ...props
  };
  const propNames = Object.keys(props);
  for (const propName of propNames) {
    void 0 === props[propName] && delete props[propName];
  }
  return props;
}, exports.forbiddenField = forbiddenField, exports.forbiddenValueOf = "Cannot use valueOf", 
exports.formatDurationIso = (slots, options) => {
  const [roundingMode, nanoInc, subsecDigits] = refineTimeDisplayOptions(options, 3);
  return nanoInc > 1 && (slots = {
    ...slots,
    ...roundDayTimeDurationByInc(slots, nanoInc, roundingMode)
  }), ((durationSlots, subsecDigits) => {
    const {sign: sign} = durationSlots, abs = -1 === sign ? negateDurationFields(durationSlots) : durationSlots, {hours: hours, minutes: minutes} = abs, [wholeSec, subsecNano] = divModBigNano(durationFieldsToBigNano(abs, 3), nanoInSec, divModTrunc);
    checkDurationTimeUnit(wholeSec);
    const subsecNanoString = formatSubsecNano(subsecNano, subsecDigits), forceSec = subsecDigits >= 0 || !sign || subsecNanoString;
    return (sign < 0 ? "-" : "") + "P" + formatDurationFragments({
      Y: formatDurationNumber(abs.years),
      M: formatDurationNumber(abs.months),
      W: formatDurationNumber(abs.weeks),
      D: formatDurationNumber(abs.days)
    }) + (hours || minutes || wholeSec || forceSec ? "T" + formatDurationFragments({
      H: formatDurationNumber(hours),
      M: formatDurationNumber(minutes),
      S: formatDurationNumber(wholeSec, forceSec) + subsecNanoString
    }) : "");
  })(slots, subsecDigits);
}, exports.formatInstantIso = (refineTimeZoneArg, getTimeZoneOps, instantSlots, options) => {
  const [timeZoneArg, roundingMode, nanoInc, subsecDigits] = (options => {
    const timeDisplayTuple = refineTimeDisplayTuple(options = normalizeOptions(options));
    return [ options.timeZone, ...timeDisplayTuple ];
  })(options), providedTimeZone = void 0 !== timeZoneArg;
  return ((providedTimeZone, timeZoneOps, epochNano, roundingMode, nanoInc, subsecDigits) => {
    epochNano = roundBigNanoByInc(epochNano, nanoInc, roundingMode, 1);
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNano);
    return formatIsoDateTimeFields(epochNanoToIso(epochNano, offsetNano), subsecDigits) + (providedTimeZone ? formatOffsetNano(roundToMinute(offsetNano)) : "Z");
  })(providedTimeZone, getTimeZoneOps(providedTimeZone ? refineTimeZoneArg(timeZoneArg) : utcTimeZoneId), instantSlots.epochNanoseconds, roundingMode, nanoInc, subsecDigits);
}, exports.formatOffsetNano = formatOffsetNano, exports.formatPlainDateIso = (plainDateSlots, options) => {
  return calendarIdLike = plainDateSlots.calendar, isoFields = plainDateSlots, calendarDisplay = refineDateDisplayOptions(options), 
  formatIsoDateFields(isoFields) + formatCalendar(calendarIdLike, calendarDisplay);
  // removed by dead control flow
 var calendarIdLike, isoFields, calendarDisplay; 
}, exports.formatPlainDateTimeIso = (plainDateTimeSlots0, options) => {
  const [a, b, c, d] = (options => (options = normalizeOptions(options), [ refineCalendarDisplay(options), ...refineTimeDisplayTuple(options) ]))(options);
  return calendarIdLike = plainDateTimeSlots0.calendar, calendarDisplay = a, subsecDigits = d, 
  formatIsoDateTimeFields(roundDateTimeToNano(plainDateTimeSlots0, c, b), subsecDigits) + formatCalendar(calendarIdLike, calendarDisplay);
  // removed by dead control flow
 var calendarIdLike, calendarDisplay, subsecDigits; 
}, exports.formatPlainMonthDayIso = (plainMonthDaySlots, options) => formatDateLikeIso(plainMonthDaySlots.calendar, formatIsoMonthDayFields, plainMonthDaySlots, refineDateDisplayOptions(options)), 
exports.formatPlainTimeIso = (slots, options) => {
  const [a, b, c] = refineTimeDisplayOptions(options);
  return subsecDigits = c, formatIsoTimeFields(roundTimeToNano(slots, b, a)[0], subsecDigits);
  // removed by dead control flow
 var subsecDigits; 
}, exports.formatPlainYearMonthIso = (plainYearMonthSlots, options) => formatDateLikeIso(plainYearMonthSlots.calendar, formatIsoYearMonthFields, plainYearMonthSlots, refineDateDisplayOptions(options)), 
exports.formatZonedDateTimeIso = (getTimeZoneOps, zonedDateTimeSlots0, options) => {
  const [a, b, c, d, e, f] = (options => {
    options = normalizeOptions(options);
    const calendarDisplay = refineCalendarDisplay(options), subsecDigits = refineSubsecDigits(options), offsetDisplay = refineOffsetDisplay(options), roundingMode = refineRoundingMode(options, 4), smallestUnit = refineSmallestUnit(options, 4);
    return [ calendarDisplay, refineTimeZoneDisplay(options), offsetDisplay, roundingMode, ...refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) ];
  })(options);
  return ((getTimeZoneOps, calendarSlot, timeZoneSlot, epochNano, calendarDisplay, timeZoneDisplay, offsetDisplay, roundingMode, nanoInc, subsecDigits) => {
    epochNano = roundBigNanoByInc(epochNano, nanoInc, roundingMode, 1);
    const offsetNano = getTimeZoneOps(timeZoneSlot).getOffsetNanosecondsFor(epochNano);
    return formatIsoDateTimeFields(epochNanoToIso(epochNano, offsetNano), subsecDigits) + formatOffsetNano(roundToMinute(offsetNano), offsetDisplay) + ((timeZoneNative, timeZoneDisplay) => 1 !== timeZoneDisplay ? "[" + (2 === timeZoneDisplay ? "!" : "") + getId(timeZoneNative) + "]" : "")(timeZoneSlot, timeZoneDisplay) + formatCalendar(calendarSlot, calendarDisplay);
  })(getTimeZoneOps, zonedDateTimeSlots0.calendar, zonedDateTimeSlots0.timeZone, zonedDateTimeSlots0.epochNanoseconds, a, b, c, d, e, f);
}, exports.getCurrentEpochNano = getCurrentEpochNano, exports.getCurrentIsoDateTime = timeZoneOps => {
  const epochNano = getCurrentEpochNano();
  return epochNanoToIso(epochNano, timeZoneOps.getOffsetNanosecondsFor(epochNano));
}, exports.getCurrentTimeZoneId = () => currentTimeZoneId || (currentTimeZoneId = (new RawDateTimeFormat).resolvedOptions().timeZone), 
exports.getDurationBlank = slots => !slots.sign, exports.getEpochMicro = slots => bigNanoToBigInt(slots.epochNanoseconds, nanoInMicro), 
exports.getEpochMilli = getEpochMilli, exports.getEpochNano = slots => bigNanoToBigInt(slots.epochNanoseconds), 
exports.getEpochSec = slots => epochNanoToSec(slots.epochNanoseconds), exports.getId = getId, 
exports.getRequiredDateFields = calendarId => calendarId === isoCalendarId ? [ "year", "day" ] : [], 
exports.getRequiredMonthDayFields = calendarId => calendarId === isoCalendarId ? dayFieldNames : [], 
exports.getRequiredYearMonthFields = calendarId => calendarId === isoCalendarId ? yearFieldNames : [], 
exports.getSingleInstantFor = getSingleInstantFor, exports.hasAllPropsByName = (props, names) => {
  for (const name of names) {
    if (!(name in props)) {
      return 0;
    }
  }
  return 1;
}, exports.instantConfig = instantConfig, exports.instantToZonedDateTime = (instantSlots, timeZoneSlot, calendarSlot = isoCalendarId) => createZonedDateTimeSlots(instantSlots.epochNanoseconds, timeZoneSlot, calendarSlot), 
exports.instantsEqual = (instantSlots0, instantSlots1) => !compareInstants(instantSlots0, instantSlots1), 
exports.invalidBag = "Invalid bag", exports.invalidCallingContext = "Invalid calling context", 
exports.invalidFormatType = branding => `Cannot format ${branding}`, exports.invalidProtocol = "Invalid protocol", 
exports.isObjectLike = isObjectLike, exports.isTimeZoneSlotsEqual = isTimeZoneSlotsEqual, 
exports.isoCalendarId = isoCalendarId, exports.isoTimeFieldDefaults = isoTimeFieldDefaults, 
exports.isoTimeFieldNamesAsc = isoTimeFieldNamesAsc, exports.mapPropNames = mapPropNames, 
exports.mapProps = mapProps, exports.memoize = memoize, exports.mismatchingFormatTypes = "Mismatching types for formatting", 
exports.monthDayConfig = monthDayConfig, exports.moveInstant = (doSubtract, instantSlots, durationSlots) => createInstantSlots(checkEpochNanoInBounds(addBigNanos(instantSlots.epochNanoseconds, (fields => {
  if (durationHasDateParts(fields)) {
    throw new RangeError("Cannot use large units");
  }
  return durationFieldsToBigNano(fields, 5);
})(doSubtract ? negateDurationFields(durationSlots) : durationSlots)))), exports.movePlainDate = (getCalendarOps, doSubtract, plainDateSlots, durationSlots, options) => {
  const {calendar: calendar} = plainDateSlots;
  return createPlainDateSlots(moveDate(getCalendarOps(calendar), plainDateSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options), calendar);
}, exports.movePlainDateTime = (getCalendarOps, doSubtract, plainDateTimeSlots, durationSlots, options = Object.create(null)) => {
  const {calendar: calendar} = plainDateTimeSlots;
  return createPlainDateTimeSlots(moveDateTime(getCalendarOps(calendar), plainDateTimeSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options), calendar);
}, exports.movePlainTime = (doSubtract, slots, durationSlots) => createPlainTimeSlots(moveTime(slots, doSubtract ? negateDurationFields(durationSlots) : durationSlots)[0]), 
exports.movePlainYearMonth = (getCalendarOps, doSubtract, plainYearMonthSlots, durationSlots, options = Object.create(null)) => {
  const calendarSlot = plainYearMonthSlots.calendar, calendarOps = getCalendarOps(calendarSlot);
  let isoDateFields = moveToDayOfMonthUnsafe(calendarOps, plainYearMonthSlots);
  doSubtract && (durationSlots = negateDuration(durationSlots)), durationSlots.sign < 0 && (isoDateFields = calendarOps.dateAdd(isoDateFields, {
    ...durationFieldDefaults,
    months: 1
  }), isoDateFields = moveByDays(isoDateFields, -1));
  const movedIsoDateFields = calendarOps.dateAdd(isoDateFields, durationSlots, options);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(calendarOps, movedIsoDateFields), calendarSlot);
}, exports.moveZonedDateTime = (getCalendarOps, getTimeZoneOps, doSubtract, zonedDateTimeSlots, durationSlots, options = Object.create(null)) => {
  const timeZoneOps = getTimeZoneOps(zonedDateTimeSlots.timeZone), calendarOps = getCalendarOps(zonedDateTimeSlots.calendar);
  return {
    ...zonedDateTimeSlots,
    ...moveZonedEpochs(timeZoneOps, calendarOps, zonedDateTimeSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options)
  };
}, exports.nanoInMilli = nanoInMilli, exports.negateDuration = negateDuration, exports.numberToBigNano = numberToBigNano, 
exports.parseCalendarId = s => {
  const res = parseDateTimeLike(s) || parseYearMonthOnly(s) || parseMonthDayOnly(s);
  return res ? res.calendar : s;
}, exports.parseDuration = s => {
  const parsed = (s => {
    const parts = durationRegExp.exec(s);
    return parts ? (parts => {
      function parseUnit(wholeStr, fracStr, timeUnit) {
        let leftoverUnits = 0, wholeUnits = 0;
        if (timeUnit && ([leftoverUnits, leftoverNano] = divModFloor(leftoverNano, unitNanoMap[timeUnit])), 
        void 0 !== wholeStr) {
          if (hasAnyFrac) {
            throw new RangeError(invalidSubstring(wholeStr));
          }
          wholeUnits = (s => {
            const n = parseInt(s);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(s));
            }
            return n;
          })(wholeStr), hasAny = 1, fracStr && (leftoverNano = parseSubsecNano(fracStr) * (unitNanoMap[timeUnit] / nanoInSec), 
          hasAnyFrac = 1);
        }
        return leftoverUnits + wholeUnits;
      }
      let hasAny = 0, hasAnyFrac = 0, leftoverNano = 0, durationFields = {
        ...zipProps(durationFieldNamesAsc, [ parseUnit(parts[2]), parseUnit(parts[3]), parseUnit(parts[4]), parseUnit(parts[5]), parseUnit(parts[6], parts[7], 5), parseUnit(parts[8], parts[9], 4), parseUnit(parts[10], parts[11], 3) ]),
        ...nanoToGivenFields(leftoverNano, 2, durationFieldNamesAsc)
      };
      if (!hasAny) {
        throw new RangeError(noValidFields(durationFieldNamesAsc));
      }
      return parseSign(parts[1]) < 0 && (durationFields = negateDurationFields(durationFields)), 
      durationFields;
    })(parts) : void 0;
  })(requireString(s));
  if (!parsed) {
    throw new RangeError(failedParse(s));
  }
  return createDurationSlots(checkDurationUnits(parsed));
}, exports.parseInstant = s => {
  const organized = parseDateTimeLike(s = toStringViaPrimitive(s));
  if (!organized) {
    throw new RangeError(failedParse(s));
  }
  let offsetNano;
  if (organized.hasZ) {
    offsetNano = 0;
  } else {
    if (!organized.offset) {
      throw new RangeError(failedParse(s));
    }
    offsetNano = parseOffsetNano(organized.offset);
  }
  return organized.timeZone && parseOffsetNanoMaybe(organized.timeZone, 1), createInstantSlots(isoToEpochNanoWithOffset(checkIsoDateTimeFields(organized), offsetNano));
}, exports.parsePlainDate = parsePlainDate, exports.parsePlainDateTime = s => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized || organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return createPlainDateTimeSlots(finalizeDateTime(organized));
}, exports.parsePlainMonthDay = (getCalendarOps, s) => {
  const organized = parseMonthDayOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createPlainMonthDaySlots(checkIsoDateFields(organized));
  }
  const dateSlots = parsePlainDate(s), {calendar: calendar} = dateSlots, calendarOps = getCalendarOps(calendar), [origYear, origMonth, day] = calendarOps.dateParts(dateSlots), [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(origYear, origMonth), [year, month] = calendarOps.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, day);
  return createPlainMonthDaySlots(checkIsoDateInBounds(calendarOps.isoFields(year, month, day)), calendar);
}, exports.parsePlainTime = s => {
  let altParsed, organized = (s => {
    const parts = timeRegExp.exec(s);
    return parts ? (organizeAnnotationParts(parts[10]), organizeTimeParts(parts)) : void 0;
  })(requireString(s));
  if (!organized) {
    if (organized = parseDateTimeLike(s), !organized) {
      throw new RangeError(failedParse(s));
    }
    if (!organized.hasTime) {
      throw new RangeError(failedParse(s));
    }
    if (organized.hasZ) {
      throw new RangeError(invalidSubstring("Z"));
    }
    requireIsoCalendar(organized);
  }
  if ((altParsed = parseYearMonthOnly(s)) && isIsoDateFieldsValid(altParsed)) {
    throw new RangeError(failedParse(s));
  }
  if ((altParsed = parseMonthDayOnly(s)) && isIsoDateFieldsValid(altParsed)) {
    throw new RangeError(failedParse(s));
  }
  return createPlainTimeSlots(constrainIsoTimeFields(organized, 1));
}, exports.parsePlainYearMonth = (getCalendarOps, s) => {
  const organized = parseYearMonthOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(organized)));
  }
  const isoSlots = parsePlainDate(s);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(getCalendarOps(isoSlots.calendar), isoSlots));
}, exports.parseRelativeToSlots = s => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized) {
    throw new RangeError(failedParse(s));
  }
  if (organized.timeZone) {
    return finalizeZonedDateTime(organized, organized.offset ? parseOffsetNano(organized.offset) : void 0);
  }
  if (organized.hasZ) {
    throw new RangeError(failedParse(s));
  }
  return finalizeDate(organized);
}, exports.parseTimeZoneId = s => {
  const parsed = parseDateTimeLike(s);
  return parsed && (parsed.timeZone || parsed.hasZ && utcTimeZoneId || parsed.offset) || s;
}, exports.parseZonedDateTime = (s, options) => {
  const organized = parseDateTimeLike(requireString(s));
  if (!organized || !organized.timeZone) {
    throw new RangeError(failedParse(s));
  }
  const {offset: offset} = organized, offsetNano = offset ? parseOffsetNano(offset) : void 0, [, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
  return finalizeZonedDateTime(organized, offsetNano, offsetDisambig, epochDisambig);
}, exports.plainDateTimeToPlainMonthDay = (getCalendarOps, plainDateTimeSlots, plainDateFields) => convertToPlainMonthDay(getCalendarOps(plainDateTimeSlots.calendar), plainDateFields), 
exports.plainDateTimeToPlainYearMonth = (getCalendarOps, plainDateTimeSlots, plainDateFields) => {
  const calendarOps = getCalendarOps(plainDateTimeSlots.calendar);
  return createPlainYearMonthSlots({
    ...plainDateTimeSlots,
    ...convertToPlainYearMonth(calendarOps, plainDateFields)
  });
}, exports.plainDateTimeToZonedDateTime = (getTimeZoneOps, plainDateTimeSlots, timeZoneSlot, options) => createZonedDateTimeSlots(checkEpochNanoInBounds(((getTimeZoneOps, timeZoneSlot, isoFields, options) => {
  const epochDisambig = refineEpochDisambigOptions(options);
  return getSingleInstantFor(getTimeZoneOps(timeZoneSlot), isoFields, epochDisambig);
})(getTimeZoneOps, timeZoneSlot, plainDateTimeSlots, options)), timeZoneSlot, plainDateTimeSlots.calendar), 
exports.plainDateTimeWithFields = (getCalendarOps, plainDateTimeSlots, initialFields, modFields, options) => {
  const optionsCopy = copyOptions(options);
  return createPlainDateTimeSlots(((calendarOps, initialFields, modFields, options) => {
    const fields = mergeCalendarFields(calendarOps, initialFields, modFields, dateFieldNamesAlpha, timeFieldNamesAsc), overflow = refineOverflowOptions(options);
    return checkIsoDateTimeInBounds({
      ...calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow)),
      ...refineTimeBag(fields, overflow)
    });
  })(getCalendarOps(plainDateTimeSlots.calendar), initialFields, modFields, optionsCopy));
}, exports.plainDateTimeWithPlainDate = (plainDateTimeSlots, plainDateSlots) => createPlainDateTimeSlots({
  ...plainDateTimeSlots,
  ...plainDateSlots
}, getPreferredCalendarSlot(plainDateTimeSlots.calendar, plainDateSlots.calendar)), 
exports.plainDateTimeWithPlainTime = (plainDateTimeSlots, plainTimeSlots = isoTimeFieldDefaults) => createPlainDateTimeSlots({
  ...plainDateTimeSlots,
  ...plainTimeSlots
}), exports.plainDateTimesEqual = (plainDateTimeSlots0, plainDateTimeSlots1) => !compareIsoDateTimeFields(plainDateTimeSlots0, plainDateTimeSlots1) && isIdLikeEqual(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar), 
exports.plainDateToPlainDateTime = (plainDateSlots, plainTimeFields = isoTimeFieldDefaults) => createPlainDateTimeSlots(checkIsoDateTimeInBounds({
  ...plainDateSlots,
  ...plainTimeFields
})), exports.plainDateToPlainMonthDay = (getCalendarOps, plainDateSlots, plainDateFields) => convertToPlainMonthDay(getCalendarOps(plainDateSlots.calendar), plainDateFields), 
exports.plainDateToPlainYearMonth = (getCalendarOps, plainDateSlots, plainDateFields) => convertToPlainYearMonth(getCalendarOps(plainDateSlots.calendar), plainDateFields), 
exports.plainDateToZonedDateTime = (refineTimeZoneArg, refinePlainTimeArg, getTimeZoneOps, plainDateSlots, options) => {
  const timeZoneSlot = refineTimeZoneArg(options.timeZone), plainTimeArg = options.plainTime, isoTimeFields = void 0 !== plainTimeArg ? refinePlainTimeArg(plainTimeArg) : isoTimeFieldDefaults;
  return createZonedDateTimeSlots(getSingleInstantFor(getTimeZoneOps(timeZoneSlot), {
    ...plainDateSlots,
    ...isoTimeFields
  }), timeZoneSlot, plainDateSlots.calendar);
}, exports.plainDateWithFields = (getCalendarOps, plainDateSlots, initialFields, modFields, options) => {
  const optionsCopy = copyOptions(options);
  return ((calendarOps, initialFields, modFields, options) => {
    const fields = mergeCalendarFields(calendarOps, initialFields, modFields, dateFieldNamesAlpha);
    return calendarOps.dateFromFields(fields, options);
  })(getCalendarOps(plainDateSlots.calendar), initialFields, modFields, optionsCopy);
}, exports.plainDatesEqual = (plainDateSlots0, plainDateSlots1) => !compareIsoDateFields(plainDateSlots0, plainDateSlots1) && isIdLikeEqual(plainDateSlots0.calendar, plainDateSlots1.calendar), 
exports.plainMonthDayToPlainDate = (getCalendarOps, plainMonthDaySlots, plainMonthDayFields, bag) => ((calendarOps, input, bag) => convertToIso(calendarOps, input, monthCodeDayFieldNames, requireObjectLike(bag), yearFieldNames))(getCalendarOps(plainMonthDaySlots.calendar), plainMonthDayFields, bag), 
exports.plainMonthDayWithFields = (getCalendarOps, plainMonthDaySlots, initialFields, modFields, options) => {
  const optionsCopy = copyOptions(options);
  return ((calendarOps, initialFields, modFields, options) => {
    const fields = mergeCalendarFields(calendarOps, initialFields, modFields, dateFieldNamesAlpha);
    return calendarOps.monthDayFromFields(fields, options);
  })(getCalendarOps(plainMonthDaySlots.calendar), initialFields, modFields, optionsCopy);
}, exports.plainMonthDaysEqual = (plainMonthDaySlots0, plainMonthDaySlots1) => !compareIsoDateFields(plainMonthDaySlots0, plainMonthDaySlots1) && isIdLikeEqual(plainMonthDaySlots0.calendar, plainMonthDaySlots1.calendar), 
exports.plainTimeToPlainDateTime = (plainTimeSlots0, plainDateSlots1) => createPlainDateTimeSlots(checkIsoDateTimeInBounds({
  ...plainTimeSlots0,
  ...plainDateSlots1
})), exports.plainTimeToZonedDateTime = (refineTimeZoneArg, refinePlainDateArg, getTimeZoneOps, slots, options) => {
  const refinedOptions = requireObjectLike(options), plainDateSlots = refinePlainDateArg(refinedOptions.plainDate), timeZoneSlot = refineTimeZoneArg(refinedOptions.timeZone);
  return createZonedDateTimeSlots(getSingleInstantFor(getTimeZoneOps(timeZoneSlot), {
    ...plainDateSlots,
    ...slots
  }), timeZoneSlot, plainDateSlots.calendar);
}, exports.plainTimeWithFields = (initialFields, mod, options) => createPlainTimeSlots(((initialFields, modFields, options) => {
  const overflow = refineOverflowOptions(options);
  return refineTimeBag({
    ...pluckProps(timeFieldNamesAlpha, initialFields),
    ...refineFields(modFields, timeFieldNamesAlpha)
  }, overflow);
})(initialFields, mod, options)), exports.plainTimesEqual = (plainTimeSlots0, plainTimeSlots1) => !compareIsoTimeFields(plainTimeSlots0, plainTimeSlots1), 
exports.plainYearMonthToPlainDate = (getCalendarOps, plainYearMonthSlots, plainYearMonthFields, bag) => ((calendarOps, input, bag) => convertToIso(calendarOps, input, yearMonthCodeFieldNames, requireObjectLike(bag), dayFieldNames))(getCalendarOps(plainYearMonthSlots.calendar), plainYearMonthFields, bag), 
exports.plainYearMonthWithFields = (getCalendarOps, plainYearMonthSlots, initialFields, modFields, options) => {
  const optionsCopy = copyOptions(options);
  return createPlainYearMonthSlots(((calendarOps, initialFields, modFields, options) => {
    const fields = mergeCalendarFields(calendarOps, initialFields, modFields, yearMonthFieldNames);
    return calendarOps.yearMonthFromFields(fields, options);
  })(getCalendarOps(plainYearMonthSlots.calendar), initialFields, modFields, optionsCopy));
}, exports.plainYearMonthsEqual = (plainYearMonthSlots0, plainYearMonthSlots1) => !compareIsoDateFields(plainYearMonthSlots0, plainYearMonthSlots1) && isIdLikeEqual(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar), 
exports.pluckProps = pluckProps, exports.queryNativeTimeZone = queryNativeTimeZone, 
exports.refineCalendarId = id => resolveCalendarId(requireString(id)), exports.refineDateDiffOptions = options => (options = normalizeOptions(options), 
refineLargestUnit(options, 9, 6, 1)), exports.refineDurationBag = bag => {
  const durationFields = refineFields(bag, durationFieldNamesAlpha);
  return createDurationSlots(checkDurationUnits({
    ...durationFieldDefaults,
    ...durationFields
  }));
}, exports.refineEpochDisambigOptions = refineEpochDisambigOptions, exports.refineMaybeZonedDateTimeBag = (refineTimeZoneArg, getTimeZoneOps, calendarOps, bag) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, [], timeAndZoneFieldNames);
  if (void 0 !== fields.timeZone) {
    const isoDateFields = calendarOps.dateFromFields(fields), isoTimeFields = refineTimeBag(fields), timeZoneSlot = refineTimeZoneArg(fields.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(getTimeZoneOps(timeZoneSlot), {
        ...isoDateFields,
        ...isoTimeFields
      }, void 0 !== fields.offset ? parseOffsetNano(fields.offset) : void 0),
      timeZone: timeZoneSlot
    };
  }
  return {
    ...calendarOps.dateFromFields(fields),
    ...isoTimeFieldDefaults
  };
}, exports.refineOverflowOptions = refineOverflowOptions, exports.refinePlainDateBag = (calendarOps, bag, options, requireFields = []) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, requireFields);
  return calendarOps.dateFromFields(fields, options);
}, exports.refinePlainDateTimeBag = (calendarOps, bag, options) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, [], timeFieldNamesAsc), overflow = refineOverflowOptions(options);
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow)),
    ...refineTimeBag(fields, overflow)
  }));
}, exports.refinePlainMonthDayBag = (calendarOps, calendarAbsent, bag, options, requireFields = []) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, requireFields);
  return calendarAbsent && void 0 !== fields.month && void 0 === fields.monthCode && void 0 === fields.year && (fields.year = isoEpochFirstLeapYear), 
  calendarOps.monthDayFromFields(fields, options);
}, exports.refinePlainTimeBag = (bag, options) => {
  const overflow = refineOverflowOptions(options);
  return createPlainTimeSlots(refineTimeBag(refineFields(bag, timeFieldNamesAlpha, [], 1), overflow));
}, exports.refinePlainYearMonthBag = (calendarOps, bag, options, requireFields) => {
  const fields = refineCalendarFields(calendarOps, bag, yearMonthFieldNames, requireFields);
  return calendarOps.yearMonthFromFields(fields, options);
}, exports.refineTimeZoneId = id => resolveTimeZoneId(requireString(id)), exports.refineZonedDateTimeBag = (refineTimeZoneArg, getTimeZoneOps, calendarOps, calendarSlot, bag, options) => {
  const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, timeZoneFieldNames, timeAndZoneFieldNames), timeZoneSlot = refineTimeZoneArg(fields.timeZone), [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options), isoDateFields = calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow)), isoTimeFields = refineTimeBag(fields, overflow);
  return createZonedDateTimeSlots(getMatchingInstantFor(getTimeZoneOps(timeZoneSlot), {
    ...isoDateFields,
    ...isoTimeFields
  }, void 0 !== fields.offset ? parseOffsetNano(fields.offset) : void 0, offsetDisambig, epochDisambig), timeZoneSlot, calendarSlot);
}, exports.refineZonedFieldOptions = refineZonedFieldOptions, exports.requireBoolean = requireBoolean, 
exports.requireFunction = requireFunction, exports.requireInteger = requireInteger, 
exports.requireIntegerOrUndefined = input => {
  if (void 0 !== input) {
    return requireInteger(input);
  }
}, exports.requireNonNullish = o => {
  if (null == o) {
    throw new TypeError("Cannot be null or undefined");
  }
  return o;
}, exports.requireObjectLike = requireObjectLike, exports.requirePositiveInteger = requirePositiveInteger, 
exports.requirePositiveIntegerOrUndefined = input => {
  if (void 0 !== input) {
    return requirePositiveInteger(input);
  }
}, exports.requireString = requireString, exports.requireStringOrUndefined = input => {
  if (void 0 !== input) {
    return requireString(input);
  }
}, exports.resolveCalendarId = resolveCalendarId, exports.resolveTimeZoneId = resolveTimeZoneId, 
exports.roundDuration = (refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) => {
  const durationLargestUnit = getMaxDurationUnit(slots), [largestUnit, smallestUnit, roundingInc, roundingMode, relativeToSlots] = ((options, defaultLargestUnit, refineRelativeTo) => {
    options = normalizeOptionsOrString(options, smallestUnitStr);
    let largestUnit = refineLargestUnit(options);
    const relativeToInternals = refineRelativeTo(options.relativeTo);
    let roundingInc = parseRoundingIncInteger(options);
    const roundingMode = refineRoundingMode(options, 7);
    let smallestUnit = refineSmallestUnit(options);
    if (void 0 === largestUnit && void 0 === smallestUnit) {
      throw new RangeError("Required smallestUnit or largestUnit");
    }
    return null == smallestUnit && (smallestUnit = 0), null == largestUnit && (largestUnit = Math.max(smallestUnit, defaultLargestUnit)), 
    checkLargestSmallestUnit(largestUnit, smallestUnit), roundingInc = refineRoundingInc(roundingInc, smallestUnit, 1), 
    [ largestUnit, smallestUnit, roundingInc, roundingMode, relativeToInternals ];
  })(options, durationLargestUnit, refineRelativeTo), maxUnit = Math.max(durationLargestUnit, largestUnit);
  if (!isZonedEpochSlots(relativeToSlots) && maxUnit <= 6) {
    return createDurationSlots(checkDurationUnits(((durationFields, largestUnit, smallestUnit, roundingInc, roundingMode) => {
      const roundedBigNano = roundBigNano(durationFieldsToBigNano(durationFields), smallestUnit, roundingInc, roundingMode);
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(roundedBigNano, largestUnit)
      };
    })(slots, largestUnit, smallestUnit, roundingInc, roundingMode)));
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), endMarker = moveMarker(calendarOps, marker, slots);
  let balancedDuration = diffMarkers(calendarOps, marker, endMarker, largestUnit);
  const origSign = slots.sign, balancedSign = computeDurationSign(balancedDuration);
  if (origSign && balancedSign && origSign !== balancedSign) {
    throw new RangeError(invalidProtocolResults);
  }
  return balancedSign && (balancedDuration = roundRelativeDuration(balancedDuration, markerToEpochNano(endMarker), largestUnit, smallestUnit, roundingInc, roundingMode, calendarOps, marker, markerToEpochNano, moveMarker)), 
  createDurationSlots(balancedDuration);
}, exports.roundInstant = (instantSlots, options) => {
  const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options, 5, 1);
  return createInstantSlots(roundBigNano(instantSlots.epochNanoseconds, smallestUnit, roundingInc, roundingMode, 1));
}, exports.roundPlainDateTime = (slots, options) => createPlainDateTimeSlots(roundDateTime(slots, ...refineRoundingOptions(options)), slots.calendar), 
exports.roundPlainTime = (slots, options) => {
  const [a, b, c] = refineRoundingOptions(options, 5);
  var roundingMode;
  return createPlainTimeSlots((roundingMode = c, roundTimeToNano(slots, computeNanoInc(a, b), roundingMode)[0]));
}, exports.roundZonedDateTime = (getTimeZoneOps, slots, options) => {
  let {epochNanoseconds: epochNanoseconds, timeZone: timeZone, calendar: calendar} = slots;
  const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options);
  if (0 === smallestUnit && 1 === roundingInc) {
    return slots;
  }
  const timeZoneOps = getTimeZoneOps(timeZone);
  if (6 === smallestUnit) {
    epochNanoseconds = ((computeInterval, timeZoneOps, slots, roundingMode) => {
      const isoSlots = zonedEpochSlotsToIso(slots, timeZoneOps), [isoFields0, isoFields1] = computeInterval(isoSlots), epochNano = slots.epochNanoseconds, epochNano0 = getSingleInstantFor(timeZoneOps, isoFields0), epochNano1 = getSingleInstantFor(timeZoneOps, isoFields1);
      if (bigNanoOutside(epochNano, epochNano0, epochNano1)) {
        throw new RangeError(invalidProtocolResults);
      }
      return roundWithMode(computeEpochNanoFrac(epochNano, epochNano0, epochNano1), roundingMode) ? epochNano1 : epochNano0;
    })(computeDayInterval, timeZoneOps, slots, roundingMode);
  } else {
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNanoseconds);
    epochNanoseconds = getMatchingInstantFor(timeZoneOps, roundDateTime(epochNanoToIso(epochNanoseconds, offsetNano), smallestUnit, roundingInc, roundingMode), offsetNano, 2, 0, 1);
  }
  return createZonedDateTimeSlots(epochNanoseconds, timeZone, calendar);
}, exports.slotsWithCalendar = (slots, calendarSlot) => ({
  ...slots,
  calendar: calendarSlot
}), exports.slotsWithTimeZone = (slots, timeZoneSlot) => ({
  ...slots,
  timeZone: timeZoneSlot
}), exports.timeConfig = timeConfig, exports.timeFieldNamesAsc = timeFieldNamesAsc, 
exports.totalDuration = (refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) => {
  const maxDurationUnit = getMaxDurationUnit(slots), [totalUnit, relativeToSlots] = ((options, refineRelativeTo) => {
    const relativeToInternals = refineRelativeTo((options = normalizeOptionsOrString(options, "unit")).relativeTo);
    let totalUnit = refineTotalUnit(options);
    return totalUnit = requirePropDefined("unit", totalUnit), [ totalUnit, relativeToInternals ];
  })(options, refineRelativeTo);
  if (isUniformUnit(Math.max(totalUnit, maxDurationUnit), relativeToSlots)) {
    return totalDayTimeDuration(slots, totalUnit);
  }
  if (!relativeToSlots) {
    throw new RangeError("Missing relativeTo");
  }
  const [marker, calendarOps, timeZoneOps] = createMarkerSystem(getCalendarOps, getTimeZoneOps, relativeToSlots), markerToEpochNano = createMarkerToEpochNano(timeZoneOps), moveMarker = createMoveMarker(timeZoneOps), diffMarkers = createDiffMarkers(timeZoneOps), endMarker = moveMarker(calendarOps, marker, slots), balancedDuration = diffMarkers(calendarOps, marker, endMarker, totalUnit);
  return isUniformUnit(totalUnit, relativeToSlots) ? totalDayTimeDuration(balancedDuration, totalUnit) : ((durationFields, endEpochNano, totalUnit, calendarOps, marker, markerToEpochNano, moveMarker) => {
    const sign = computeDurationSign(durationFields), [epochNano0, epochNano1] = clampRelativeDuration(calendarOps, clearDurationFields(totalUnit, durationFields), totalUnit, sign, marker, markerToEpochNano, moveMarker), frac = computeEpochNanoFrac(endEpochNano, epochNano0, epochNano1);
    return durationFields[durationFieldNamesAsc[totalUnit]] + frac * sign;
  })(balancedDuration, markerToEpochNano(endMarker), totalUnit, calendarOps, marker, markerToEpochNano, moveMarker);
}, exports.unitNamesAsc = unitNamesAsc, exports.validateTimeZoneGap = validateTimeZoneGap, 
exports.validateTimeZoneOffset = validateTimeZoneOffset, exports.yearMonthConfig = yearMonthConfig, 
exports.zonedConfig = zonedConfig, exports.zonedDateTimeToInstant = zonedDateTimeSlots0 => createInstantSlots(zonedDateTimeSlots0.epochNanoseconds), 
exports.zonedDateTimeToPlainDate = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainDateSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainDateTime = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainDateTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainMonthDay = (getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) => convertToPlainMonthDay(getCalendarOps(zonedDateTimeSlots0.calendar), zonedDateTimeFields), 
exports.zonedDateTimeToPlainTime = (getTimeZoneOps, zonedDateTimeSlots0) => createPlainTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps)), 
exports.zonedDateTimeToPlainYearMonth = (getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) => convertToPlainYearMonth(getCalendarOps(zonedDateTimeSlots0.calendar), zonedDateTimeFields), 
exports.zonedDateTimeWithFields = (getCalendarOps, getTimeZoneOps, zonedDateTimeSlots, initialFields, modFields, options) => {
  const optionsCopy = copyOptions(options), {calendar: calendar, timeZone: timeZone} = zonedDateTimeSlots;
  return createZonedDateTimeSlots(((calendarOps, timeZoneOps, initialFields, modFields, options) => {
    const fields = mergeCalendarFields(calendarOps, initialFields, modFields, dateFieldNamesAlpha, timeAndOffsetFieldNames, offsetFieldNames), [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options, 2);
    return getMatchingInstantFor(timeZoneOps, {
      ...calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow)),
      ...refineTimeBag(fields, overflow)
    }, parseOffsetNano(fields.offset), offsetDisambig, epochDisambig);
  })(getCalendarOps(calendar), getTimeZoneOps(timeZone), initialFields, modFields, optionsCopy), timeZone, calendar);
}, exports.zonedDateTimeWithPlainDate = (getTimeZoneOps, zonedDateTimeSlots, plainDateSlots) => {
  const timeZoneSlot = zonedDateTimeSlots.timeZone, timeZoneOps = getTimeZoneOps(timeZoneSlot), isoFields = {
    ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
    ...plainDateSlots
  }, calendar = getPreferredCalendarSlot(zonedDateTimeSlots.calendar, plainDateSlots.calendar);
  return createZonedDateTimeSlots(getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2), timeZoneSlot, calendar);
}, exports.zonedDateTimeWithPlainTime = (getTimeZoneOps, zonedDateTimeSlots, plainTimeSlots = isoTimeFieldDefaults) => {
  const timeZoneSlot = zonedDateTimeSlots.timeZone, timeZoneOps = getTimeZoneOps(timeZoneSlot), isoFields = {
    ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
    ...plainTimeSlots
  };
  return createZonedDateTimeSlots(getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2), timeZoneSlot, zonedDateTimeSlots.calendar);
}, exports.zonedDateTimesEqual = (zonedDateTimeSlots0, zonedDateTimeSlots1) => !compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) && !!isTimeZoneSlotsEqual(zonedDateTimeSlots0.timeZone, zonedDateTimeSlots1.timeZone) && isIdLikeEqual(zonedDateTimeSlots0.calendar, zonedDateTimeSlots1.calendar), 
exports.zonedEpochSlotsToIso = zonedEpochSlotsToIso;


/***/ },

/***/ "./node_modules/temporal-polyfill/index.cjs"
/*!**************************************************!*\
  !*** ./node_modules/temporal-polyfill/index.cjs ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var classApi = __webpack_require__(/*! ./chunks/classApi.cjs */ "./node_modules/temporal-polyfill/chunks/classApi.cjs");

exports.Intl = classApi.IntlExtended, exports.Temporal = classApi.Temporal, exports.toTemporalInstant = classApi.toTemporalInstant;


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/ui/module/index.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ueu_ueu_canvas_course_blueprint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ueu/ueu-canvas/course/blueprint */ "./node_modules/@ueu/ueu-canvas/dist/course/blueprint.js");
/* harmony import */ var _ueu_ueu_canvas_course_blueprint__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ueu_ueu_canvas_course_blueprint__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ueu_ueu_canvas_course_Course__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ueu/ueu-canvas/course/Course */ "./node_modules/@ueu/ueu-canvas/dist/course/Course.js");
/* harmony import */ var _ueu_ueu_canvas_course_Course__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ueu_ueu_canvas_course_Course__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ueu_ueu_canvas_content_assignments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ueu/ueu-canvas/content/assignments */ "./node_modules/@ueu/ueu-canvas/dist/content/assignments/index.js");
/* harmony import */ var _ueu_ueu_canvas_content_assignments__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ueu_ueu_canvas_content_assignments__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ueu_ueu_canvas_canvasUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ueu/ueu-canvas/canvasUtils */ "./node_modules/@ueu/ueu-canvas/dist/canvasUtils.js");
/* harmony import */ var _ueu_ueu_canvas_canvasUtils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ueu_ueu_canvas_canvasUtils__WEBPACK_IMPORTED_MODULE_4__);





(async () => {
    const course = await _ueu_ueu_canvas_course_Course__WEBPACK_IMPORTED_MODULE_2__.Course.getFromUrl(document.documentURI);
    const moduleHeader = document.querySelector('.header-bar-right__buttons');
    if (moduleHeader) {
        if (course === null || course === void 0 ? void 0 : course.isBlueprint) {
            const btn = document.createElement('btn');
            btn.innerHTML = "Lock All";
            moduleHeader.insertBefore(btn, moduleHeader.firstChild);
            btn.classList.add('btn');
            btn.addEventListener('click', async () => {
                btn.innerHTML = "Locking...";
                await (0,_ueu_ueu_canvas_course_blueprint__WEBPACK_IMPORTED_MODULE_1__.lockBlueprint)(course.id, await course.getModules());
                btn.innerHTML = "Locked!";
                location.reload();
            });
        }
        const btn = document.createElement('btn');
        btn.classList.add('btn');
        btn.innerHTML = "Adjust Due Dates";
        moduleHeader.insertBefore(btn, moduleHeader.firstChild);
        btn.addEventListener('click', async () => {
            const offset = prompt("Days to offset by?");
            assert__WEBPACK_IMPORTED_MODULE_0___default()(course);
            assert__WEBPACK_IMPORTED_MODULE_0___default()(offset);
            const assignments = await (0,_ueu_ueu_canvas_canvasUtils__WEBPACK_IMPORTED_MODULE_4__.renderAsyncGen)((0,_ueu_ueu_canvas_content_assignments__WEBPACK_IMPORTED_MODULE_3__.assignmentDataGen)(course.id));
            await (0,_ueu_ueu_canvas_content_assignments__WEBPACK_IMPORTED_MODULE_3__.updateAssignmentDueDates)(parseInt(offset), assignments);
            location.reload();
        });
    }
})();

})();

/******/ })()
;
//# sourceMappingURL=module.js.map