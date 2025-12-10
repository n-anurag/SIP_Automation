import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

interface LocatorEntry {
  name: string;
  locator: string;
}

interface LocatorFile {
  pageName: string;
  url?: string;
  locators: LocatorEntry[];
}

const locatorCache: Record<string, LocatorFile> = {};

function loadLocatorFile(objectName: string): LocatorFile {
  if (locatorCache[objectName]) return locatorCache[objectName];

  const filePath = path.join(__dirname, '..', 'locators', `${objectName}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw) as LocatorFile;
  locatorCache[objectName] = parsed;
  return parsed;
}

export async function getValidatedLocator(
  page: Page,
  objectName: string,
  elementName: string
): Promise<Locator> {
  const file = loadLocatorFile(objectName);
  const entry = file.locators.find(l => l.name === elementName);

  if (!entry) {
    throw new Error(`Locator '${elementName}' not found in '${objectName}.json'`);
  }

  const locator = page.locator(entry.locator);
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  return locator;
}

export function getPageUrl(objectName: string): string | undefined {
  const file = loadLocatorFile(objectName);
  return file.url;
}

export function getRawLocator(objectName: string, elementName: string): string {
  const file = loadLocatorFile(objectName);
  const entry = file.locators.find(l => l.name === elementName);

  if (!entry) {
    throw new Error(`Locator '${elementName}' not found in '${objectName}.json'`);
  }
  return entry.locator;
}
