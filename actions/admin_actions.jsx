// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import * as AdminActions from 'mattermost-redux/actions/admin';
import * as UserActions from 'mattermost-redux/actions/users';
import {Client4} from 'mattermost-redux/client';

import {clientLogout} from 'actions/global_actions.jsx';
import {getOnNavigationConfirmed} from 'selectors/views/admin';
import store from 'stores/redux_store.jsx';
import {ActionTypes} from 'utils/constants.jsx';

const dispatch = store.dispatch;
const getState = store.getState;

export async function saveConfig(config, success, error) {
    const {data, error: err} = await AdminActions.updateConfig(config)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function reloadConfig(success, error) {
    const {data, error: err} = await AdminActions.reloadConfig()(dispatch, getState);
    if (data && success) {
        AdminActions.getConfig()(dispatch, getState);
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function adminResetMfa(userId, success, error) {
    const {data, error: err} = await UserActions.updateUserMfa(userId, false)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function getClusterStatus(success, error) {
    const {data, error: err} = await AdminActions.getClusterStatus()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function testEmail(config, success, error) {
    const {data, error: err} = await AdminActions.testEmail(config)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function ldapTest(success, error) {
    const {data, error: err} = await AdminActions.testLdap()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function invalidateAllCaches(success, error) {
    const {data, error: err} = await AdminActions.invalidateCaches()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function recycleDatabaseConnection(success, error) {
    const {data, error: err} = await AdminActions.recycleDatabase()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function adminResetPassword(userId, password, success, error) {
    const {data, error: err} = await UserActions.updateUserPassword(userId, '', password)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function samlCertificateStatus(success, error) {
    const {data, error: err} = await AdminActions.getSamlCertificateStatus()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export function getOAuthAppInfo(clientId, success, error) {
    Client4.getOAuthAppInfo(clientId).then(
        (data) => {
            if (success) {
                success(data);
            }
        }
    ).catch(
        (err) => {
            if (error) {
                error(err);
            }
        }
    );
}

export function allowOAuth2(params, success, error) {
    const responseType = params.response_type;
    const clientId = params.client_id;
    const redirectUri = params.redirect_uri;
    const state = params.state;
    const scope = params.scope;

    Client4.authorizeOAuthApp(responseType, clientId, redirectUri, state, scope).then(
        (data) => {
            if (success) {
                success(data);
            }
        }
    ).catch(
        (err) => {
            if (error) {
                error(err);
            }
        }
    );
}

export async function emailToLdap(loginId, password, token, ldapId, ldapPassword, success, error) {
    const {data, error: err} = await UserActions.switchEmailToLdap(loginId, password, ldapId, ldapPassword, token)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function emailToOAuth(loginId, password, token, newType, success, error) {
    const {data, error: err} = await UserActions.switchEmailToOAuth(newType, loginId, password, token)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function oauthToEmail(currentService, email, password, success, error) {
    const {data, error: err} = await UserActions.switchOAuthToEmail(currentService, email, password)(dispatch, getState);
    if (data) {
        if (data.follow_link) {
            clientLogout(data.follow_link);
        }
        if (success) {
            success(data);
        }
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function uploadBrandImage(brandImage, success, error) {
    const {data, error: err} = await AdminActions.uploadBrandImage(brandImage)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function uploadLicenseFile(file, success, error) {
    const {data, error: err} = await AdminActions.uploadLicense(file)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function removeLicenseFile(success, error) {
    const {data, error: err} = await AdminActions.removeLicense()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function uploadPublicSamlCertificate(file, success, error) {
    const {data, error: err} = await AdminActions.uploadPublicSamlCertificate(file)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function uploadPrivateSamlCertificate(file, success, error) {
    const {data, error: err} = await AdminActions.uploadPrivateSamlCertificate(file)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function uploadIdpSamlCertificate(file, success, error) {
    const {data, error: err} = await AdminActions.uploadIdpSamlCertificate(file)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function removePublicSamlCertificate(success, error) {
    const {data, error: err} = await AdminActions.removePublicSamlCertificate()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function removePrivateSamlCertificate(success, error) {
    const {data, error: err} = await AdminActions.removePrivateSamlCertificate()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function removeIdpSamlCertificate(success, error) {
    const {data, error: err} = await AdminActions.removeIdpSamlCertificate()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function getStandardAnalytics(teamId) {
    await AdminActions.getStandardAnalytics(teamId)(dispatch, getState);
}

export async function getAdvancedAnalytics(teamId) {
    await AdminActions.getAdvancedAnalytics(teamId)(dispatch, getState);
}

export async function getPostsPerDayAnalytics(teamId) {
    await AdminActions.getPostsPerDayAnalytics(teamId)(dispatch, getState);
}

export async function getUsersPerDayAnalytics(teamId) {
    await AdminActions.getUsersPerDayAnalytics(teamId)(dispatch, getState);
}

export async function elasticsearchTest(config, success, error) {
    const {data, error: err} = await AdminActions.testElasticsearch(config)(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export async function elasticsearchPurgeIndexes(success, error) {
    const {data, error: err} = await AdminActions.purgeElasticsearchIndexes()(dispatch, getState);
    if (data && success) {
        success(data);
    } else if (err && error) {
        error({id: err.server_error_id, ...err});
    }
}

export function setNavigationBlocked(blocked) {
    return {
        type: ActionTypes.SET_NAVIGATION_BLOCKED,
        blocked
    };
}

export function deferNavigation(onNavigationConfirmed) {
    return {
        type: ActionTypes.DEFER_NAVIGATION,
        onNavigationConfirmed
    };
}

export function cancelNavigation() {
    return {
        type: ActionTypes.CANCEL_NAVIGATION
    };
}

export function confirmNavigation() {
    // have to rename these because of lint no-shadow
    return (thunkDispatch, thunkGetState) => {
        const callback = getOnNavigationConfirmed(thunkGetState());

        if (callback) {
            callback();
        }

        thunkDispatch({
            type: ActionTypes.CONFIRM_NAVIGATION
        });
    };
}
