'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { RootState } from '@/store';

const navItems = [
  { label: 'Shops', href: '/shops' },
  { label: 'Cart', href: '/cart' },
  { label: 'History', href: '/orders' },
  { label: 'Coupons', href: '/coupons' },
];

export default function Header() {
  const pathname = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  );

  const activeTab =
    navItems.find((item) => pathname === item.href || pathname.startsWith(item.href))
      ?.href ?? false;

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const cartSummary = (
    <Paper
      elevation={0}
      sx={{
        px: 1.5,
        py: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 999,
        bgcolor: 'background.paper',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        whiteSpace: 'nowrap',
      }}
    >
      <Badge
        badgeContent={totalItems}
        color="primary"
        sx={{
          '& .MuiBadge-badge': {
            fontWeight: 700,
            minWidth: 18,
            height: 18,
            fontSize: '0.7rem',
          },
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 999,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'action.selected',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} />
        </Box>
      </Badge>

      <Box>
        <Typography variant="caption" color="text.secondary" lineHeight={1}>
          Cart
        </Typography>
        <Typography variant="body2" fontWeight={800} lineHeight={1.1}>
          {totalItems} items · ${cartTotal.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );

  const drawer = (
    <Box
      sx={{
        width: 320,
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,1) 100%)',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1.25}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
              flexShrink: 0,
            }}
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
              Delivery App
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.1}>
              Fast, simple, tasty
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={handleDrawerToggle} aria-label="close navigation menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      <Box
        sx={{
          p: 1.5,
          mb: 2,
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Cart summary
        </Typography>
        <Typography variant="subtitle2" fontWeight={700}>
          {totalItems} items · ${cartTotal.toFixed(2)}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ px: 0.5, mb: 1 }}>
        Navigate
      </Typography>

      <List sx={{ p: 0, flex: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              onClick={() => setMobileOpen(false)}
              sx={{
                position: 'relative',
                borderRadius: 2,
                mb: 0.75,
                px: 1.5,
                py: 1.2,
                overflow: 'hidden',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                '&::before': active
                  ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 8,
                      bottom: 8,
                      width: 4,
                      borderRadius: 999,
                      bgcolor: 'primary.main',
                    }
                  : {},
                '&:hover': {
                  transform: 'translateX(2px)',
                },
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <ListItemText
                primary={
                  item.href === '/cart' ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <span>{item.label}</span>
                      <Badge
                        badgeContent={totalItems}
                        color="primary"
                        sx={{
                          '& .MuiBadge-badge': {
                            fontWeight: 700,
                            minWidth: 18,
                            height: 18,
                            fontSize: '0.7rem',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    item.label
                  )
                }
                primaryTypographyProps={{
                  fontWeight: active ? 800 : 600,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box pt={2}>
        <Typography variant="caption" color="text.secondary">
          Tip: use the menu to navigate quickly
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        bgcolor: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            py: 1,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.25} minWidth={0}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: 2,
                flexShrink: 0,
              }}
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
            </Box>

            <Box minWidth={0}>
              <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
                Delivery App
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.1}>
                Fast, simple, tasty
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Tabs
              value={activeTab}
              textColor="inherit"
              TabIndicatorProps={{
                sx: {
                  height: 3,
                  borderRadius: 999,
                },
              }}
              sx={{
                minHeight: 48,
                '& .MuiTabs-flexContainer': {
                  gap: 0.75,
                },
                '& .MuiTab-root': {
                  minHeight: 48,
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 2,
                  borderRadius: 999,
                  color: 'text.secondary',
                  opacity: 1,
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: 'action.selected',
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <Tab
                  key={item.href}
                  component={Link}
                  href={item.href}
                  value={item.href}
                  label={item.label}
                />
              ))}
            </Tabs>

            {cartSummary}
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
            aria-label="open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 340 },
            maxWidth: '100%',
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
