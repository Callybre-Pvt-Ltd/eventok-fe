import { Button, Modal } from 'antd';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useFormModal } from './helper';
import {
  Body,
  Divider,
  Footer,
  Header,
  HeaderText,
  IconBadge,
  Subtitle,
  Title,
} from './styled';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  width?: number;
  bodyMaxHeight?: number;
  primaryLabel?: string;
  onPrimary?: () => void;
  primaryLoading?: boolean;
  primaryDisabled?: boolean;
  primaryDanger?: boolean;
  secondaryLabel?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function FormModal({
  open,
  onClose,
  icon: Icon,
  title,
  subtitle,
  width = 560,
  bodyMaxHeight,
  primaryLabel,
  onPrimary,
  primaryLoading,
  primaryDisabled,
  primaryDanger,
  secondaryLabel = 'Cancel',
  footer,
  children,
}: FormModalProps) {
  const { palette } = useFormModal();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={width}
      footer={null}
      destroyOnHidden
    >
      <Header>
        {Icon ? (
          <IconBadge $palette={palette}>
            <Icon size={20} strokeWidth={2.25} />
          </IconBadge>
        ) : null}
        <HeaderText>
          <Title $palette={palette}>{title}</Title>
          {subtitle ? <Subtitle $palette={palette}>{subtitle}</Subtitle> : null}
        </HeaderText>
      </Header>
      <Divider />
      <Body $maxHeight={bodyMaxHeight}>{children}</Body>
      <Footer>
        {footer ?? (
          <>
            <Button onClick={onClose}>{secondaryLabel}</Button>
            <Button
              type="primary"
              danger={primaryDanger}
              loading={primaryLoading}
              disabled={primaryDisabled}
              onClick={onPrimary}
            >
              {primaryLabel}
            </Button>
          </>
        )}
      </Footer>
    </Modal>
  );
}

export {
  Field,
  FieldLabel,
  FieldRow,
  PreviewCard,
  PreviewLabel,
  PreviewRow,
  PreviewValue,
  Section,
  SectionLabel,
  SelectableList,
  SelectableName,
  SelectablePrice,
  SelectableRow,
} from './styled';
