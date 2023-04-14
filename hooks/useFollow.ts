import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import { useLoginModal } from "./useLoginModal";
import useUser from "./useUser";
import { useMemo, useCallback } from "react";
import axios from "axios";
const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchtedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    
    if (!currentUser) {
      loginModal.onOpen();
      
    }
    try {
        let request;
        if (isFollowing) {
          request = () => axios.delete(`/api/follow`, { data: { userId } });
        } else {
          request = () => axios.post("/api/follow", { userId });
        }
        await request();

        mutateCurrentUser();
        mutateFetchtedUser();
        toast.success("Success!");
      } catch (error) {
        toast.error("Somwthign went wrong with following");
      }
  }, [currentUser, isFollowing, mutateCurrentUser, userId, mutateFetchtedUser]);

  return {
    isFollowing, 
    toggleFollow, 

  }
};

export default useFollow ;
