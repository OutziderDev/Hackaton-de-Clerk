import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabaseClient";

interface LikesPostProps {
  id_post: string;
  id_user: string | null;
}

const LikesPost: React.FC<LikesPostProps> = ({ id_post, id_user }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!id_post || !id_user) {
      console.log("id_post or id_user not available yet");
      return;
    }
    const fetchLikeStatus = async () => {
       const { count: coutLikes, error: errorLikes } = await supabase
        .from("likes")
        .select('*', { count: 'exact', head: true })
        .eq("post_id", id_post);

      if (errorLikes) {
        console.log(errorLikes.message);
      }
      setLikeCount(coutLikes || 0);

      const { data: existingLike, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', id_user)
        .eq('post_id', id_post)
        .single();
      if (error) {
        console.log('mensaje de error:',error.message);
      }
      setHasLiked(!!existingLike); 
    };

    fetchLikeStatus();
  }, [id_post, id_user]);


  const handleLike = async () => {
    if (hasLiked) {
      const { data: existingLike } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', id_user)
        .eq('post_id', id_post)
        .single();

      if (existingLike) {
        await supabase.from('likes').delete().eq('id', existingLike.id);
        setHasLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } else {
      await supabase.from('likes').insert({ user_id: id_user, post_id: id_post });
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLike} className="cursor-pointer">
        <svg
          className={`size-6 stroke-2 ${hasLiked ? 'fill-red-500' : 'fill-transparent'} stroke-red-500`}
        >
          <use href="/icons/SocialSprite.svg#heart" />
        </svg>
      </button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikesPost;
