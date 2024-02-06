import { WithTranslation, withTranslation } from 'react-i18next';

import { MouseEvent } from 'react';

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

import { TAvailableLanguages } from '@/@types/i18next';

const FLAG_CONFIG = {
  en: 'gb',
  ru: 'ru',
} satisfies Record<TAvailableLanguages, FlagNameValues>;

const ChangeLanguageButton = ({ i18n }: WithTranslation) => {
  const onChangeLanguage = (
    _: MouseEvent,
    { text: newLanguage }: DropdownItemProps,
  ) => {
    if (newLanguage !== i18n.language) {
      i18n.changeLanguage(newLanguage as TAvailableLanguages);
    }
  };

  return (
    <Dropdown
      icon={
        <IconGroup>
          <Icon name="world" size="large" />
          <Icon corner="bottom right" className="!mr-1">
            <Flag name={FLAG_CONFIG[i18n.language as TAvailableLanguages]} />
          </Icon>
        </IconGroup>
      }
      button
      scrolling
      className="icon"
    >
      <DropdownMenu>
        {Object.keys(i18n.store.data).map((language: string) => (
          <DropdownItem
            key={language}
            className="!uppercase"
            icon={<Flag name={FLAG_CONFIG[language as TAvailableLanguages]} />}
            text={language}
            onClick={onChangeLanguage}
          />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withTranslation()(ChangeLanguageButton);
