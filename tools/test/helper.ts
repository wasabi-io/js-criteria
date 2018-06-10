import Resolver from "wasabi-common/lib/resolver";

Resolver
    .electron()
    .root("src")
    .alias("js-criteria/lib/*", "./")
    .apply();

import { expect } from 'chai';
import { spy } from 'sinon';

(global as any).expect = expect;
(global as any).spy = spy;

