import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ThemedBox from './ThemedBox';
import {
  userSelector,
  subredditsSelector,
  createLoadingAndErrorSelector,
} from '../selectors';
import { startLogout } from '../actions/auth';
import { getSubreddits } from '../actions/subreddits';
import LoginAndRegisterButtons from './LoginAndRegisterButtons';

const Navbar = ({ user, subreddits, isLoading, error, startLogout, getSubreddits }) => {
  const location = useLocation();
  const subredditName = location.pathname.match(/r\/([^/]+)/)?.[1] || 'Home';

  // Color scheme with pink and purple tones
  const borderColor = useColorModeValue('pink.300', 'purple.700');
  const headingColor = useColorModeValue('pink.600', 'purple.300');
  const menuButtonBg = useColorModeValue('pink.500', 'purple.400');
  const menuButtonHoverBg = useColorModeValue('pink.600', 'purple.500');
  const submitButtonBg = useColorModeValue('purple.500', 'pink.300');
  const submitButtonHoverBg = useColorModeValue('purple.600', 'pink.400');
  const buttonTextColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    getSubreddits();
  }, [getSubreddits]);

  return (
    <ThemedBox
      py={3}
      px={[4, 6, 8]}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="2px solid"
      borderColor={borderColor}
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <Heading
          ml={[2, 4]}
          fontSize={['1.5rem', '2.5rem']}
          color={headingColor}
          display={user ? 'block' : ['none', 'block']}
        >
          TredIt
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        <Menu>
          <MenuButton
            mx={2}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={menuButtonBg}
            color={buttonTextColor}
            _hover={{ bg: menuButtonHoverBg }}
          >
            {subredditName}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/">Home</MenuItem>
            {subreddits.map(({ name }) => (
              <MenuItem key={name} as={Link} to={`/r/${name}`}>
                {`r/${name}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <Flex justifyContent="flex-end" alignItems="center" gap={3}>
        {/* Submit Button */}
        {user && (
          <Button
            as={Link}
            to="/submit"
            bg={submitButtonBg}
            color={buttonTextColor}
            _hover={{ bg: submitButtonHoverBg }}
          >
            Submit
          </Button>
        )}

        {/* User Menu / Login & Register Buttons */}
        {user ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {user.username}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/submit">Submit post</MenuItem>
              <MenuItem as={Link} to="/subreddits/create">Create subreddit</MenuItem>
              <MenuItem onClick={startLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <LoginAndRegisterButtons />
        )}

        {/* Color Mode Switcher */}
        <ColorModeSwitcher />
      </Flex>
    </ThemedBox>
  );
};

const { loadingSelector, errorSelector } = createLoadingAndErrorSelector(['GET_SUBREDDITS']);

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  subreddits: subredditsSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  getSubreddits: () => dispatch(getSubreddits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
