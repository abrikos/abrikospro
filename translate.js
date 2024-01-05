import {readFile, writeFile} from 'fs/promises';
import cp from 'child_process';

async function crawler(dir) {
    const listPages = cp.execSync(`find ./${dir} -print`, {encoding: 'utf-8'}).split('\n')
    const found = []
    for (const page of listPages) {
        try {
            const content = await readFile(page, {encoding: 'utf-8'})
            const matches = content.match(/\$t\('(.+)'\)/g)
            if (matches) {
                found.push(...matches.map(f => f.replace("$t('", '').replace("')", '')))
            }
        } catch (e) {

        }
    }
    return found
}

async function main() {
    const en = JSON.parse(
        await readFile(
            new URL('./locales/en.json', import.meta.url)
        )
    );
    const ru = JSON.parse(
        await readFile(
            new URL('./locales/ru.json', import.meta.url)
        )
    );
    const found = [...new Set([...await crawler('pages'), ...await crawler('layouts'), ...await crawler('components'),])]
    for (const word of found) {
        if (!en[word]) {
            en[word] = word
        }
        if (!ru[word]) {
            ru[word] = word
        }
    }
    await writeFile('./locales/en.json', JSON.stringify(en, null, 4))
    await writeFile('./locales/ru.json', JSON.stringify(ru, null, 4))
}

main()