import { Helmet } from 'react-helmet';
import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';
const TimelineContainer = lazy(() => import('../TimelineContainer'))
const UserProfileContainer = lazy(() => import('../UserProfileContainer'))
const PostContainer = lazy(() => import('../PostContainer'))
const TermContainer = lazy(() => import('../TermContainer'))
const NotFoundContainer = lazy(() => import('../NotFoundContainer'))

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);

  useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<Suspense fallback={null}><TimelineContainer /></Suspense>} path="/" />
          <Route element={<Suspense fallback={null}><UserProfileContainer /></Suspense>} path="/users/:username" />
          <Route element={<Suspense fallback={null}><PostContainer /></Suspense>} path="/posts/:postId" />
          <Route element={<Suspense fallback={null}><TermContainer /></Suspense>} path="/terms" />
          <Route element={<Suspense fallback={null}><NotFoundContainer /></Suspense>} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
