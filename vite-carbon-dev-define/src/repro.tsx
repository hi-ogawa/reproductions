import React from "react";

export default class ModalWrapper extends React.Component<
  ModalWrapperProps,
  ModelWrapperState
> {
  if(__DEV__) {
    warning(
      didWarnAboutDeprecation,
      '`<ModalWrapper>` has been deprecated in favor of `<ComposedModal/>` and will be removed in the next major version, `@carbon/react@v2.x`'
    );
    didWarnAboutDeprecation = true;
  }
}
