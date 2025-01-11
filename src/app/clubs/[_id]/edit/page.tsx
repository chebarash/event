"use client";

import useUser from "@/hooks/useUser";
import { notFound } from "next/navigation";
import { useClubContext } from "@/hooks/useClub";
import Loading from "@/ui/loading/loading";
import { ShortClubType } from "@/types/types";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "@/ui/admin/admin.module.css";
import Image from "next/image";
import { Vibrant } from "node-vibrant/browser";

export default function EditPage() {
  const { user, loading } = useUser();
  const { _id, description, channel, cover, color, leader, edit } =
    useClubContext();
  const [waiting, setWait] = useState<boolean>(false);
  const [club, setClub] = useState<ShortClubType>({
    _id,
    description,
    channel,
    cover,
    color,
  });
  const ref = useRef<HTMLFormElement>(null);
  const [colors, setColors] = useState<Array<string>>([`#000000`]);

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!ref.current?.reportValidity()) return;
    if (waiting) return;
    window.Telegram.WebApp.showConfirm(`Are you sure?`, async (ok) => {
      if (ok) {
        setWait(true);
        await edit(club);
        setWait(false);
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const colors = await Vibrant.from(
          `${process.env.NEXT_PUBLIC_BASE_URL}/photo/${club.cover}`
        ).getPalette();
        const c = [
          colors.Vibrant?.hex,
          colors.DarkVibrant?.hex,
          colors.LightVibrant?.hex,
          colors.Muted?.hex,
          colors.DarkMuted?.hex,
          colors.LightMuted?.hex,
        ].filter((color) => color != undefined) as Array<string>;
        setColors(c);
        if (!c.includes(club.color)) setClub({ ...club, color: c[0] });
      } catch (e) {}
    })();
  }, [club.cover]);

  useEffect(() => {
    const { MainButton, themeParams } = window.Telegram.WebApp;
    MainButton.onClick(submit);
    MainButton.setParams({
      is_active: true,
      is_visible: true,
      text: `Save`,
      color: themeParams.section_bg_color,
      text_color: themeParams.text_color,
    });
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(submit);
    };
  }, [club, waiting]);

  if (!loading && leader._id != user?._id) return notFound();
  if (!user) return <Loading />;

  return (
    <main>
      <form ref={ref} className={styles.form} onSubmit={submit}>
        <section className={styles.section}>
          <h3>Description</h3>
          <p>You can use formatting that is supported in telegram.</p>
          <textarea
            ref={(refDesc) => {
              if (refDesc) {
                refDesc.style.height = `0`;
                refDesc.style.height = `${refDesc.scrollHeight}px`;
              }
            }}
            name="description"
            id="description"
            required
            value={club.description}
            onChange={(e) => {
              setClub({ ...club, description: e.target.value });
              e.target.style.height = `0`;
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            style={{ resize: `none` }}
          ></textarea>
        </section>
        <section className={styles.section}>
          <h3>Channel</h3>
          <p>username of your club&apos;s telegram channel without @.</p>
          {club.channel ? (
            <input
              required
              type="text"
              name="channel"
              id="channel"
              value={club.channel}
              onChange={(e) =>
                setClub({
                  ...club,
                  channel: e.target.value.length ? e.target.value : undefined,
                })
              }
            />
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() => setClub({ ...club, channel: `puevent` })}
            >
              Add
            </button>
          )}
        </section>
        <section className={styles.section}>
          <h3>Cover</h3>
          <p>Just send a 1x1 photo to the bot and copy and paste his answer.</p>
          <input
            required
            type="text"
            name="cover"
            id="cover"
            pattern="^AgACAgIAAxkBA[A-Za-z0-9_\-]{53,70}$"
            value={club.cover}
            onChange={(e) =>
              setClub({
                ...club,
                cover: e.target.value,
              })
            }
          />
          <button
            type="button"
            className={styles.button}
            onClick={async () =>
              setClub({ ...club, cover: await navigator.clipboard.readText() })
            }
          >
            Paste
          </button>
        </section>
        <section className={styles.section}>
          <h3>Color</h3>
          <p>Choose club card color.</p>
          <select
            required
            name="author"
            id="author"
            onChange={(e) =>
              setClub({
                ...club,
                color: e.target.value,
              })
            }
            value={club.color}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className={styles.colors}>
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                style={{
                  backgroundColor: color,
                  width: `calc(100% / ${colors.length})`,
                }}
                onClick={() => setClub({ ...club, color })}
              >
                {club.color == color && (
                  <svg width="20" height="21" viewBox="0 0 20 21">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.0003 0.5H20.0003V19.5H16.0003V7.32843L3.0003 20.3284L0.171875 17.5L13.1719 4.5H1.0003V0.5Z"
                      fill="#ffffff"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <Image
            className={styles.cover}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${club.cover}`}
            alt="cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </section>
      </form>
    </main>
  );
}
