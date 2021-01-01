import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderProps extends StackHeaderProps {
    showCancel?: boolean;
    title: string;
}

export default HeaderProps;