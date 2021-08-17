import { Entry } from './entry';
import fs from 'fs';
import { parse } from 'node-html-parser';
import yargs from 'yargs';

export function main(path: string, output: string) {
  const root = parse(fs.readFileSync(path).toString());
  const entries = root.childNodes[0].childNodes
    .filter((i: any) => i.rawTagName == 'tr')
    .map((row: any) => new Entry(row));

  console.log(Entry.collate(entries), output);

  fs.writeFileSync(output, JSON.stringify(Entry.collate(entries)));
}

if (require.main === module) {
  const argv = yargs.command(
    '$0 <path> [output]',
    'Parse a Nationwide transactions table.',
    () =>
      yargs
        .positional('path', {
          describe: 'Table data file path',
          type: 'string',
          default: 'table.html',
        })
        .option('output', {
          describe: 'Output path',
          type: 'string',
          default: 'output.json',
        })
  ).argv;

  main(argv['path'], argv['output']);
}
