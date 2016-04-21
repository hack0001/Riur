/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reddit.page
 */

'use strict';

import React from 'react';
import Helmet from 'react-helmet';

import Reddit from '../containers/reddit.container';

const RedditPage = () => (
    <div>
        <Helmet title='Reddit-Redux' />
        <Reddit />
    </div>
);

export default RedditPage;