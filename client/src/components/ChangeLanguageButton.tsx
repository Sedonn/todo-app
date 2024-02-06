import { MouseEvent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import {
  Dropdown,
  DropdownItem,
  DropdownItemProps,
  DropdownMenu,
  Flag,
  FlagNameValues,
  Icon,
  IconGroup,
} from 'semantic-ui-react';

import { TAvailableLocales } from '@/@types/i18next';

const FLAG_CONFIG = {
  en: 'gb',
} satisfies Record<TAvailableLocales, FlagNameValues>;

const ChangeLanguageButton = ({ i18n }: WithTranslation) => {
  const onChangeLanguage = (
    _: MouseEvent,
    { text: newLanguage }: DropdownItemProps,
  ) => {
    if (newLanguage !== i18n.language) {
      i18n.changeLanguage(newLanguage as TAvailableLocales);
    }
  };

  return (
    <Dropdown
      icon={
        <IconGroup>
          <Icon name="world" size="large" />
          <Icon corner="bottom right" className="!mr-1">
            <Flag name={FLAG_CONFIG[i18n.language as TAvailableLocales]} />
          </Icon>
        </IconGroup>
      }
      button
      scrolling
      className="icon"
    >
      <DropdownMenu>
        {i18n.languages.map((language: string) => (
          <DropdownItem
            key={language}
            className="!uppercase"
            icon={<Flag name={FLAG_CONFIG[language as TAvailableLocales]} />}
            text={language}
            onClick={onChangeLanguage}
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withTranslation()(ChangeLanguageButton);
