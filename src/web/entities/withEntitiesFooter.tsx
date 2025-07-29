/* SPDX-FileCopyrightText: 2025 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

interface EntitiesFooterWrapperProps {
  onDeleteBulk?: () => void;
  onDownloadBulk?: () => void;
  onTagsBulk?: () => void;
  onTrashBulk?: () => void;
}

export interface WithEntitiesFooterProps {
  onDeleteClick?: () => void;
  onDownloadClick?: (filename: string) => void;
  onTagsClick?: () => void;
  onTrashClick?: () => void;
}

export function withEntitiesFooter<TProps = {}, TOptions = {}>(
  options: TOptions = {} as TOptions,
) {
  return (
    Component: React.ComponentType<
      WithEntitiesFooterProps &
        Omit<TProps, keyof WithEntitiesFooterProps> &
        Omit<TOptions, keyof WithEntitiesFooterProps>
    >,
  ) => {
    const EntitiesFooterWrapper = ({
      onDownloadBulk,
      onDeleteBulk,
      onTagsBulk,
      ...props
    }: EntitiesFooterWrapperProps &
      Omit<TProps, keyof EntitiesFooterWrapperProps>) => {
      return (
        <Component
          {...(options as TOptions)}
          {...(props as TProps)}
          onDeleteClick={onDeleteBulk}
          onDownloadClick={onDownloadBulk}
          onTagsClick={onTagsBulk}
          onTrashClick={onDeleteBulk}
        />
      );
    };

    return EntitiesFooterWrapper;
  };
}

export default withEntitiesFooter;
