import { shell } from '@tauri-apps/api';
import { createCrossPlatformInvoker } from './cross-platform';

export const showInFolder = createCrossPlatformInvoker<
  (path: string, isFile?: boolean) => Promise<void>
>({
  async windows(path: string, isFile = false) {
    await new shell.Command(
      'explorer',
      [
        isFile ? `/select,` : '',
        // 防止空格被转义
        ...path.split(' ')
      ],
    ).execute();
  },
});
