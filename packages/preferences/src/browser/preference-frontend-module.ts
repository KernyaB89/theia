/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import '../../src/browser/style/index.css';
import './preferences-monaco-contribution';
import { ContainerModule, interfaces } from 'inversify';
import { FrontendApplicationContribution, bindViewContribution } from '@theia/core/lib/browser';
import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { PreferenceTreeGenerator } from './util/preference-tree-generator';
import { bindPreferenceProviders } from './preference-bindings';
import { bindPreferencesWidgets } from './views/preference-widget-bindings';
import { PreferencesEventService } from './util/preference-event-service';
import { PreferencesTreeProvider } from './preference-tree-provider';
import { PreferencesContribution } from './preference-contribution';
import { PreferenceScopeCommandManager } from './util/preference-scope-command-manager';
import { PreferencesFrontendApplicationContribution } from './preferences-frontend-application-contribution';

export function bindPreferences(bind: interfaces.Bind, unbind: interfaces.Unbind): void {
    bindPreferenceProviders(bind, unbind);
    bindPreferencesWidgets(bind);

    bind(PreferencesEventService).toSelf().inSingletonScope();
    bind(PreferencesTreeProvider).toSelf().inSingletonScope();
    bind(PreferenceTreeGenerator).toSelf().inSingletonScope();

    bindViewContribution(bind, PreferencesContribution);

    bind(PreferenceScopeCommandManager).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).to(PreferencesFrontendApplicationContribution).inSingletonScope();
    bind(TabBarToolbarContribution).toService(PreferencesContribution);
}

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bindPreferences(bind, unbind);
});
