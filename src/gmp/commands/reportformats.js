/* Copyright (C) 2017-2022 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import logger from 'gmp/log';

import registerCommand from 'gmp/command';

import ReportFormat from 'gmp/models/reportformat';

import EntitiesCommand from './entities';
import EntityCommand from './entity';

const log = logger.getLogger('gmp.commands.reportformats');

class ReportFormatCommand extends EntityCommand {
  constructor(http) {
    super(http, 'report_format', ReportFormat);
  }

  import({xml_file}) {
    const data = {
      cmd: 'import_report_format',
      xml_file,
    };
    log.debug('Importing report format', data);
    return this.action(data);
  }

  save(args) {
    const {active, id, name, summary} = args;

    const data = {
      cmd: 'save_report_format',
      enable: active,
      id,
      name,
      summary,
    };

    log.debug('Saving report format', args, data);
    return this.action(data);
  }

  getElementFromRoot(root) {
    return root.get_report_format.get_report_formats_response.report_format;
  }
}

class ReportFormatsCommand extends EntitiesCommand {
  constructor(http) {
    super(http, 'report_format', ReportFormat);
  }

  getEntitiesResponse(root) {
    return root.get_report_formats.get_report_formats_response;
  }
}

registerCommand('reportformat', ReportFormatCommand);
registerCommand('reportformats', ReportFormatsCommand);

// vim: set ts=2 sw=2 tw=80:
