/**
 * 
 */
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
/** Main container */
import Layout from 'containers/Layout';
/** Auth function container */
import { requireAuthentication } from 'containers/AuthenticatedComponent';
/** Pages Components */
import * as Pages from 'components/base/pages';
/** Forms Components */
import * as Forms from 'components/base/forms';
import Perfiles from 'components/base/forms/catalogs/Perfiles';
import Facultades from 'components/base/forms/catalogs/Facultades';
import Modulos from 'components/base/forms/catalogs/Modulos';
import Usuarios from 'components/base/forms/catalogs/Usuarios';
/** Legacy Systems Components */
import * as LegacySystems from 'components/legacySystems';

/**
 * @desc Application Routes
 */

const routes = (
	<Router>
		<Route path="/" component={Layout}>
			<IndexRedirect to="home" />
			<Route path="login" component={Pages.Login} />
			<Route path="home" component={requireAuthentication(Pages.Home)} />
			<Route path="catalogos/facultades" component={requireAuthentication(Facultades)} />
			<Route path="catalogos/modulos" component={requireAuthentication(Modulos)} />
			<Route path="seguridad/usuarios" component={requireAuthentication(Usuarios)} />
			<Route path="configuration" component={requireAuthentication(Forms.Configuration)} />
			<Route path="catalogos/perfiles" component={requireAuthentication(Perfiles)} />
			<Route path="gap/:menuKey" component={requireAuthentication(LegacySystems.GAP)} />
			<Route path="buro/:menuKey" component={requireAuthentication(LegacySystems.BURO)} />
			<Route path="sic/:menuKey" component={requireAuthentication(LegacySystems.SIC)} />
			<Route path="legacy/:menuKey/:menuKey" component={requireAuthentication(LegacySystems.legacy)}/>
			<Route path="sif/:menuKey" component={requireAuthentication(LegacySystems.SIF)} />
			<Route path="*" component={requireAuthentication(Pages.NotFoundPage)} />
		</Route>
	</Router>
);
export default routes;
