import { Typography } from '@douyinfe/semi-ui';
import cls from 'classnames';
import { Resizeable } from 'components/resizeable';
import { useCallback } from 'react';
import { Iframe } from 'tiptap/core/extensions/iframe';
import { DragableWrapper } from 'tiptap/core/wrappers/dragable';
import { getEditorContainerDOMSize } from 'tiptap/prose-utils';

import styles from './index.module.scss';

const { Text } = Typography;

export const IframeWrapper = ({ editor, node, updateAttributes }) => {
  const isEditable = editor.isEditable;
  const { url, width, height } = node.attrs;
  const { width: maxWidth } = getEditorContainerDOMSize(editor);

  const onResize = useCallback(
    (size) => {
      updateAttributes({ width: size.width, height: size.height });
    },
    [updateAttributes]
  );

  return (
    <DragableWrapper editor={editor} extensionName={Iframe.name}>
      <Resizeable width={width} maxWidth={maxWidth} height={height} isEditable={isEditable} onChangeEnd={onResize}>
        <div className={cls(styles.wrap, 'render-wrapper')}>
          {url ? (
            <div className={styles.innerWrap} style={{ pointerEvents: !isEditable ? 'auto' : 'none' }}>
              <iframe src={url}></iframe>
            </div>
          ) : (
            <div className={styles.emptyWrap}>
              <Text>请设置外链地址</Text>
            </div>
          )}
        </div>
      </Resizeable>
    </DragableWrapper>
  );
};
