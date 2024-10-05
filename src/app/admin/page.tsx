"use client";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { ContentType, EventType, UserType } from "../types/types";
import useUser from "../hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import Event from "../components/event";
import useAxios from "../hooks/useAxios";
import useEvents from "../hooks/useEvents";
import React from "react";

type EType = EventType & {
  _id: string | undefined;
  content: ContentType;
  template: string;
  button: string;
};

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `0`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref]);

  return (
    <textarea
      ref={ref}
      {...props}
      id={props.name}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
        e.target.style.height = `0`;
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      style={{ resize: `none` }}
    ></textarea>
  );
};

export default function AdminPage() {
  const router = useRouter();
  const params = useSearchParams().get(`_id`);
  const { events, fetchData: upd } = useEvents();
  const [waiting, setWait] = useState<boolean>(false);
  const { user, loading } = useUser();
  const e = events.find(({ _id }) => _id == params);
  const [event, setEvent] = useState<EType | undefined>();
  const { fetchData } = useAxios<EventType>({
    url: `/event`,
    method: `post`,
    manual: true,
  });
  const isOrg = user?.organizer || user?.clubs.length;
  const orgList = [...(user?.organizer ? [user] : []), ...(user?.clubs || [])];
  useEffect(() => {
    window.Telegram.WebApp.MainButton.setParams({
      is_active: false,
      is_visible: false,
    });
    if (!loading && !isOrg) return router.push(`/?`);
    else if (isOrg)
      setEvent({
        _id: ``,
        title: e?.title || `Event Name`,
        picture:
          e?.picture ||
          `AgACAgIAAxkBAAIEU2bAemXsC2637DDaH2RfEeluu0NmAAJr4TEb8x4BSvU86RHWlyQHAQADAgADdwADNQQ`,
        description:
          e?.description ||
          `<b>bold</b>\n<i>italic</i>\n<u>underline</u>\n<s>strikethrough</s>\n<tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough </s> <u>underline italic bold</u></i> bold</b>\n<a href="http://chebarash.uz">inline URL</a>\n<a href="http://t.me/puevent">inline mention of a user</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>\n<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>`,
        author: orgList[0],
        authorModel: user.organizer ? `users` : `clubs`,
        date: new Date(),
        venue: e?.venue || `Conference Hall`,
        duration: e?.duration || 1000 * 60 * 60 * 3,
        template:
          e?.template ||
          `<b>{{title}}</b>\n\n{{description}}\n\n<b>Venue:</b> {{venue}}\n<b>Date:</b> {{date}}\n<b>Time:</b> {{time}}\n<b>Author:</b> {{author}}\n<b>Duration:</b> {{duration}}`,
        button: e?.button || `Open in Event`,
        content: e?.content || {
          type: `photo`,
          fileId: `AgACAgIAAxkBAAIEU2bAemXsC2637DDaH2RfEeluu0NmAAJr4TEb8x4BSvU86RHWlyQHAQADAgADdwADNQQ`,
        },
      });
  }, [user, loading]);
  if (loading || !isOrg || !event) return <></>;
  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (waiting) return;
          window.Telegram.WebApp.showConfirm(
            `Are you sure you want to organize ${event.title}?`,
            async (ok) => {
              if (ok) {
                setWait(true);
                const res = await fetchData({
                  data: { ...event, _id: undefined },
                });
                if (res) {
                  await upd();
                  return router.push(`/?_id=${res?._id}`);
                }
                setWait(false);
              }
            }
          );
        }}
      >
        {orgList.length > 1 && (
          <label>
            <h3>Author</h3>
            <p>Choose a club or yourself</p>
            <select
              name="author"
              id="author"
              onChange={(e) =>
                setEvent(
                  (event) =>
                    ({
                      ...event,
                      author: orgList.filter((u) => u._id == e.target.value)[0],
                      authorModel:
                        e.target.value == user._id ? `users` : `clubs`,
                    } as EType)
                )
              }
              value={event.author._id}
            >
              {orgList.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <h3>Title</h3>
          <p>Name of the event max 100 symbols.</p>
          <input
            required
            minLength={3}
            type="text"
            name="title"
            id="title"
            value={event.title}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, title: e.target.value } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Picture</h3>
          <p>
            Just send a 16x9 photo to the bot and copy and paste his answer.
          </p>
          <input
            required
            pattern="^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$"
            type="text"
            name="picture"
            id="picture"
            value={event.picture}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, picture: e.target.value } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Description</h3>
          <p>
            Describe the event in detail, you can use formatting that is
            supported in telegram.
          </p>
          <TextArea
            required
            name="description"
            value={event.description}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, description: e.target.value } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Date</h3>
          <p>
            Enter the time in GMT+0, which means the time in Tashkent minus five
            hours.
          </p>
          <input
            min={new Date().toISOString().slice(0, 16)}
            required
            type="datetime-local"
            name="date"
            id="date"
            value={event.date.toISOString().slice(0, 16)}
            onChange={(e) =>
              setEvent((event) =>
                e.target.value.length
                  ? ({
                      ...event,
                      date: new Date(e.target.value),
                    } as EType)
                  : event
              )
            }
          />
        </label>
        <label>
          <h3>Venue</h3>
          <input
            minLength={2}
            required
            type="text"
            name="venue"
            id="venue"
            value={event.venue}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, venue: e.target.value } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Duration</h3>
          <p>Event duration in hours.</p>
          <input
            required
            min={1}
            type="number"
            name="duration"
            id="duration"
            value={event.duration / (1000 * 60 * 60)}
            onChange={(e) =>
              setEvent(
                (event) =>
                  ({
                    ...event,
                    duration: parseInt(e.target.value) * 1000 * 60 * 60,
                  } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Content</h3>
          <p>
            The message media that the user will see when you share the event.
            Just send a photo or video to the bot and copy-paste its response.
          </p>
          <input
            required
            pattern="^(AgACAgIAAxkBAAI|BAACAgIAAxkBAAI)[A-Za-z0-9_\-]{53,70}$"
            type="text"
            name="fileId"
            id="fileId"
            value={event.content.fileId}
            onChange={(e) =>
              setEvent(
                (event) =>
                  ({
                    ...event,
                    content: {
                      type: /^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$/.test(
                        e.target.value
                      )
                        ? `photo`
                        : `video`,
                      fileId: e.target.value,
                    },
                  } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Template</h3>
          <p>
            The message template that the user will see when you share the
            event, you can use variables like <code>{"{{title}}"}</code>.
          </p>
          <TextArea
            minLength={100}
            required
            name="template"
            value={event.template}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, template: e.target.value } as EType)
              )
            }
          />
        </label>
        <label>
          <h3>Button</h3>
          <p>Custom button text under message</p>
          <input
            minLength={2}
            required
            type="text"
            name="button"
            id="button"
            value={event.button}
            onChange={(e) =>
              setEvent(
                (event) => ({ ...event, button: e.target.value } as EType)
              )
            }
          />
        </label>
        <button type="submit">Save</button>
      </form>
      <Event {...event} open />
    </main>
  );
}
