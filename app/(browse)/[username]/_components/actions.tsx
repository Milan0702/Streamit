"use client"
import { toast } from "sonner"
import { onFollow,onUnfollow } from "@/actions/follow"
import { onBlock,onUnBlock } from "@/actions/block"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { useTransition } from "react"

interface ActionsProps{
    isFollowing:boolean;
    userId:string;
};

export const Actions = ({isFollowing,userId}:ActionsProps) =>{
    const [isPending,startTransition]=useTransition();

    const handleFollow = () =>{
        startTransition(()=>{
            onFollow(userId)
            .then((data) => toast.success(`You are now following ${data.following.username} `))
            .catch(() => toast.error("Something went wrong"))
        });
    };
    const handleUnFollow = () =>{
        startTransition(()=>{
            onUnfollow(userId)
            .then((data) => toast.success(`You have unfollowed  ${data.following.username} `))
            .catch(() => toast.error("Something went wrong"))
        });
    };
    const onClick = () => {
        if(isFollowing){
            handleUnFollow();
        }else{
            handleFollow();
        }
    };
    const handleBlock = () => {
        startTransition(() => {
          onUnBlock(userId)
            .then((data) => toast.success(`Unblocked the user ${data.blocked.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      };
    
      return (
        <>
        <Button 
          disabled={isPending} 
          onClick={onClick} 
          variant="primary"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
          Block
        </Button>
        </>
      );
    };